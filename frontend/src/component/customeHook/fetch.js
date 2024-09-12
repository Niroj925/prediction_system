import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '@/app/redux/slicers/credentialSlice';
import { accessTokenApi } from '../api/endpoint';

const useApi = (url, method, postDatas, isFetch) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.token.accessToken);

    const fetchData = useCallback(async () => {
        try {
            let response;
            switch (method) {
                case 'get':
                    response = await api.get(url, {
                        headers: { token: accessToken },
                        withCredentials: true
                    });
                    break;
                case 'post':
                    response = await api.post(url, postDatas, {
                        headers: { token: accessToken },
                        withCredentials: true
                    });
                    break;
                case 'update':
                    response = await api.patch(url, postDatas, {
                        headers: { token: accessToken },
                        withCredentials: true
                    });
                    break;
                case 'delete':
                    response = await api.delete(url, {
                        headers: { token: accessToken },
                        withCredentials: true
                    });
                    break;
                default:
                    throw new Error(`Unsupported request method: ${method}`);
            }

            if (response.status === 200 || response.status === 201) {
                setData(response.data);
                setIsLoading(false);
            } else {
                setHasError(true);
                setErrorMessage(response.data.err);
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                const response = await api.get(accessTokenApi, { withCredentials: true });
                dispatch(setAccessToken(response.data.token.accessToken));
                setHasError(false);
                setIsLoading(false);
            } else {
                console.log(err.response);
                setHasError(true);
                setErrorMessage(err.message);
                setIsLoading(false);
            }
        } finally {
            setIsLoading(false);
        }
    }, [url, method, postDatas, accessToken, dispatch]);

    useEffect(() => {
        if (isFetch) {
            console.log('fetching');
            fetchData();
        }
    }, [accessToken, isFetch, fetchData]);

    return { data, isLoading, hasError, errorMessage };
};

export default useApi;
