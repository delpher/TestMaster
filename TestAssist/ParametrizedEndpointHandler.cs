﻿using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace TestAssist;

public class ParametrizedEndpointHandler<TParameters> : EndpointHandler
{
    private readonly Func<TParameters, Task<object>> _callback;

    public ParametrizedEndpointHandler(string endpointPath, Func<TParameters, Task<object>> callback) 
        : base(endpointPath)
    {
        _callback = callback;
    }

    protected override async Task<object> InvokeImplementation(HttpContext context)
    {
        var parameters = await context.Request.ReadFromJsonAsync<TParameters>();
        return await _callback(parameters);
    }
}