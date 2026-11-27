const REQUEST_TIMEOUT_MS = 12000;

export class RequestError extends Error {
    constructor(kind, status) {
        super(kind);
        this.kind = kind;
        this.status = status;
    }
}

export async function fetchJson(url, signal) {
    if (signal?.aborted) throw signal.reason;

    const controller = new AbortController();
    const cancel = () => controller.abort(signal.reason);
    let timedOut = false;
    const timer = setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, REQUEST_TIMEOUT_MS);
    signal?.addEventListener('abort', cancel, { once: true });

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new RequestError('http', response.status);

        try {
            return await response.json();
        } catch (error) {
            if (error instanceof SyntaxError) throw new RequestError('invalid-response');
            throw error;
        }
    } catch (error) {
        if (signal?.aborted) throw signal.reason;
        if (timedOut) throw new RequestError('timeout');
        if (error instanceof RequestError) throw error;
        throw new RequestError('network');
    } finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', cancel);
    }
}

export function describeRequestError(error, service) {
    if (error.kind === 'timeout') return 'The request to ' + service + ' timed out. Please try again.';
    if (error.kind === 'network') return 'Could not connect to ' + service + '. Check your internet connection and try again.';
    if (error.kind === 'invalid-response') return 'The ' + service + ' service returned unusable data. Please try again.';
    if (error.status === 429) return 'The ' + service + ' service is busy. Wait a moment and try again.';
    return 'The ' + service + ' service is currently unavailable. Please try again.';
}
