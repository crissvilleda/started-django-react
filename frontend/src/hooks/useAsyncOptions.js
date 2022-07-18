import { api } from 'api';
import { isEmpty, isFinite } from 'lodash';

export default function useAsyncOptions(name_api, initial_params = {}) {
    const asyncOptions = async (search, params = {}) => {
        const _params = {};

        for (let [key, value] of Object.entries({
            ...initial_params,
            ...params,
        })) {
            if (!isEmpty(value) || isFinite(value)) {
                if (typeof value === 'object' && 'id' in value) {
                    _params[key] = value.id;
                } else {
                    _params[key] = value;
                }
            }
        }
        if (search) _params.search = search;
        _params.async_options = true;
        try {
            const _data = await api.get(name_api, _params);
            if (_data && _data.results) return _data.results;
        } catch (e) {
            return [];
        }
    };

    return { asyncOptions };
}
