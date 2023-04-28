using System.Net;
using System.Net.Http.Json;
using FluentAssertions;

namespace TestMaster.Assistant.DotNet.Tests;

public class TestAssistServerTests : IDisposable
{
    private readonly HttpClient _client;
    private readonly UriBuilder _request;
    private readonly TestEndpointsServer _server;


    public TestAssistServerTests()
    {
        var port = new Random().Next(8000, 8999);
        _server = new TestEndpointsServer();
        _server.Start(port);
        _client = new HttpClient();
        _request = new UriBuilder($"http://localhost:{port}");
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
            .Message.Should().Be("Endpoint 'not-registered/endpoint-path' is not registered.");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Requesting_Endpoints_List_Then_List_Contains_Endpoint()
    {
        _server.Register("endpoint/path/1", () => null).Should().BeTrue();
        _server.Register("endpoint/path/2", () => null).Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("/");

        var endpoints = await responseMessage.Content.ReadFromJsonAsync<string[]>();
        endpoints.Should().BeEquivalentTo("endpoint/path/1", "endpoint/path/2");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Endpoint_Path_Requested_Then_Should_Invoke_Registered_Endpoint()
    {
        _server.Register("endpoint/path", () => "invocation_result").Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("/endpoint/path");
        
        responseMessage.StatusCode.Should().Be(HttpStatusCode.OK, await responseMessage.Content.ReadAsStringAsync());
        (await responseMessage.Content.ReadFromJsonAsync<string>()).Should().Be("invocation_result");
    }

    [Fact]
    public async Task Given_Endpoint_Throws_An_Exception_When_Endpoint_Is_Invoked_Returns_An_Error()
    {
        _server.Register("endpoint/path", () => throw new TestException("test exception message"))
            .Should().BeTrue();
    
        var responseMessage = await SendRequestAsync("/endpoint/path");
    
        responseMessage.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
        var error = await responseMessage.Content.ReadFromJsonAsync<TestingServerError>();
    
        error.Message.Should().Be("Exception was thrown invoking 'endpoint/path'");
        error.Exception.Should()
            .Contain("TestException")
            .And.Contain("test exception message");
    }

    [Fact]
    public async Task Given_Parameters_Are_Passed_To_Endpoint_When_Endpoint_Is_Invoked_Parameters_Passed_To_Callback()
    {
        _server.Register<TestParameters>("endpoint/path", parameters => parameters).Should().BeTrue();

        var responseMessage = await SendRequestAsync("endpoint/path", new TestParameters { TestValue = "test value" });
        responseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var echoedParameters = await responseMessage.Content.ReadFromJsonAsync<TestParameters>();

        echoedParameters.Should().NotBeNull();
        echoedParameters.Should().BeOfType<TestParameters>();
        echoedParameters.TestValue.Should().Be("test value");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_When_Invoked_With_OPTIONS_Request_Should_Not_Invoke_Endpoint()
    {
        _server.Register<TestParameters>("endpoint/path", parameters => parameters).Should().BeTrue();
        _request.Path = "endpoint/path";

        var requestMessage = new HttpRequestMessage(HttpMethod.Options, _request.Uri);
        var response = await _client.SendAsync(requestMessage);
        response.StatusCode.Should().Be(HttpStatusCode.NoContent, await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Given_Endpoint_Registered_Twice_When_Invoking_Callback_Then_Only_Last_Registered_Callback_Gets_Invoked()
    {
        _server.Register("endpoint/path", () => "first").Should().BeTrue();
        _server.Register("endpoint/path", () => "last").Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("endpoint/path", new TestParameters { TestValue = "test value" });

        (await responseMessage.Content.ReadFromJsonAsync<string>()).Should().Be("last");
    }

    [Fact]
    public async Task Given_Endpoint_Registered_Then_Removed_When_Invoked_Then_Not_Found_Response_Returns()
    {
        _server.Register("endpoint/path", () => "first").Should().BeTrue();
        _server.Remove("endpoint/path").Should().BeTrue();
        
        var responseMessage = await SendRequestAsync("endpoint/path", new TestParameters { TestValue = "test value" });
        responseMessage.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    private async Task<HttpResponseMessage> SendRequestAsync(string path)
    {
        _request.Path = path;
        var responseMessage = await _client.GetAsync(_request.Uri);
        await VerifyContentType(responseMessage, "application/json");
        return responseMessage;
    }

    private async Task<HttpResponseMessage> SendRequestAsync(string path, object parameters)
    {
        _request.Path = path;
        var responseMessage = await _client.PostAsync(
            _request.Uri, JsonContent.Create(parameters));
        await VerifyContentType(responseMessage, "application/json");
        return responseMessage;
    }
    
    private static async Task VerifyContentType(HttpResponseMessage responseMessage, string contentType)
    {
        var content = await responseMessage.Content.ReadAsStringAsync();
        responseMessage.Content.Headers.ContentType?.MediaType.Should().Be(contentType, $"Expected {content} to be of {contentType}");
    }
    
    private class TestParameters
    {
        public string TestValue { get; set; }
    }

    private class TestException : Exception
    {
        public TestException(string message) : base(message)
        {
        }
    }

    public void Dispose()
    {
        _client?.Dispose();
        _server.Stop();
        _server.Dispose();
    }
}