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
        _request.Path = "/"; 
        var responseMessage = await SendRequestAsync();
        
        var endpoints = await responseMessage.Content.ReadFromJsonAsync<string[]>();
        endpoints.Should().BeEmpty();
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Requesting_Endpoints_List_Then_List_Contains_Endpoint()
    {
        TestingServer.Register("endpoint/path");
        _request.Path = "endpoint/path";
        var responseMessage = await SendRequestAsync();

        var endpoints = await responseMessage.Content.ReadFromJsonAsync<string[]>();
        endpoints.Should().OnlyContain(path => path == "endpoint/path");
    }

    private async Task<HttpResponseMessage> SendRequestAsync()
    {
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