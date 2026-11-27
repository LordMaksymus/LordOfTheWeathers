import { useEffect, useState } from 'react';

export function useRequest(request) {
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!request) return;

        const controller = new AbortController();
        request(controller.signal).then(data => {
            if (!controller.signal.aborted) setResult({ request, attempt, data });
        }).catch(error => {
            if (!controller.signal.aborted) setResult({ request, attempt, error });
        });

        return () => controller.abort();
    }, [request, attempt]);

    const retry = () => setAttempt(previous => previous + 1);
    const settled = result?.request === request && result?.attempt === attempt;

    return {
        data: settled ? result.data : undefined,
        error: settled ? result.error : undefined,
        loading: Boolean(request && !settled),
        retry,
    };
}
