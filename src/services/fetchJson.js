const REQUEST_TIMEOUT_MS = 12000;

export class RequestError extends Error {
    constructor(kind, status) {
        super(kind);
        this.kind = kind;
        this.status = status;
    }
}

export async function fetchJson(url, signal) {
    const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;

    try {
        const response = await fetch(url, { signal: requestSignal });
        if (!response.ok) throw new RequestError('http', response.status);

        try {
            return await response.json();
        } catch (error) {
            if (error instanceof SyntaxError) throw new RequestError('invalid-response');
            throw error;
        }
    } catch (error) {
        if (signal?.aborted) throw signal.reason;
        if (timeout.aborted) throw new RequestError('timeout');
        if (error instanceof RequestError) throw error;
        throw new RequestError('network');
    }
}

export function describeRequestError(error, service) {
    if (error.kind === 'timeout') return 'The request to ' + service + ' timed out. Please try again.';
    if (error.kind === 'network') return 'Could not connect to ' + service + '. Check your internet connection and try again.';
    if (error.kind === 'invalid-response') return 'The ' + service + ' service returned unusable data. Please try again.';
    if (error.status === 429) return 'The ' + service + ' service is busy. Wait a moment and try again.';
    return 'The ' + service + ' service is currently unavailable. Please try again.';
}
