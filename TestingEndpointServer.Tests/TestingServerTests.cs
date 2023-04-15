using System.Net;
using System.Net.Http.Json;
using FluentAssertions;

namespace TestingEndpointServer.Tests;

public class TestingServerTests : IDisposable
{
    private readonly CancellationTokenSource _cts;
    private readonly HttpClient _client;
    private readonly UriBuilder _request;

    public TestingServerTests()
    {
        _cts = new CancellationTokenSource();
        TestingServer.Start(8081, _cts.Token);
        _client = new HttpClient();
        _request = new UriBuilder("http://localhost:8081");
    }
    
    [Fact]
    public async Task Given_No_Endpoints_When_Requesting_Endpoint_List_Then_List_Is_Empty()
    {
        var responseMessage = await SendRequestAsync("/");
        
        var endpoints = await responseMessage.Content.ReadFromJsonAsync<string[]>();
        endpoints.Should().BeEmpty();
    }

    [Fact]
    public async Task Given_Endpoint_Not_Registered_When_Endpoint_Path_Requested_Then_Returns_404_Not_Found()
    {
        var response = await SendRequestAsync("/not-registered/endpoint-path");
        
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        (await response.Content.ReadFromJsonAsync<TestingServerError>())
            .Message.Should().Be($"Endpoint 'not-registered/endpoint-path' is not registered.");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Requesting_Endpoints_List_Then_List_Contains_Endpoint()
    {
        TestingServer.Register("endpoint/path/1", () => null).Should().BeTrue();
        TestingServer.Register("endpoint/path/2", () => null).Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("/");

        var endpoints = await responseMessage.Content.ReadFromJsonAsync<string[]>();
        endpoints.Should().BeEquivalentTo("endpoint/path/1", "endpoint/path/2");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Endpoint_Path_Requested_Then_Should_Invoke_Registered_Callback()
    {
        TestingServer.Register("endpoint/path", () => "invocation_result").Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("/endpoint/path");
        
        responseMessage.StatusCode.Should().Be(HttpStatusCode.OK, await responseMessage.Content.ReadAsStringAsync());
        (await responseMessage.Content.ReadFromJsonAsync<string>()).Should().Be("invocation_result");
    }

    private async Task<HttpResponseMessage> SendRequestAsync(string path)
    {
        _request.Path = path;
        var responseMessage = await _client.GetAsync(_request.Uri);
        VerifyContentType(responseMessage, "application/json");
        return responseMessage;
    }

    private static void VerifyContentType(HttpResponseMessage responseMessage, string contentType)
    {
        responseMessage.Content.Headers.ContentType?.MediaType.Should().Be(contentType);
    }

    public void Dispose()
    {
        _cts.Cancel();
    }
}