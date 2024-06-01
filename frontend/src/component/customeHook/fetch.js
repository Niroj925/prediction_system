
import { useState, useEffect } from 'react'
import api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken } from '@/app/redux/slicers/credentialSlice'
import { accessTokenApi } from '../api/endpoint'

const useApi = (url, method, postDatas, isFetch) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.token.accessToken);
    console.log(url)
    console.log(method)
    console.log(postDatas)
    console.log(isFetch)
    const fetchData = async () => {
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
                default:
            }
            if (response.status === 200 ||response.status === 201) {
                // console.log(response.data)
                setData(response.data);
                setIsLoading(false)
            } else {
                setHasError(true)
                setErrorMessage(response.data.err)
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                const response = await api.get(accessTokenApi, { withCredentials: true });
                dispatch(setAccessToken(response.data.token.accessToken));
                setHasError(false);
            } else {
                console.log(err.response);
                setHasError(true)
                setErrorMessage(err.message)
                setIsLoading(false)
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log('fts:',isFetch);
        isFetch && (
            console.log('fetching'),
            fetchData()
        )
    }, [accessToken,isFetch])

    return { data, isLoading, hasError, errorMessage }
}
export default useApi