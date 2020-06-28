function createParams(method: string, apiKey: string, host: string) {
    return {
        method: method,
        uri: host,
        json: true,
        headers: {
            'user-key': apiKey
        }
    }
}

export { createParams };
