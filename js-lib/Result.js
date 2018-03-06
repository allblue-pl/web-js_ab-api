'use strict';


class Result
{

    static Error(message)
    {
        var result = new Result.Class();
        result.result = 2;
        result.message = message;
        result.data = {};

        return result;
    }

    static Error_Connection(message)
    {
        var result = new Result.Class();
        result.result = 3;
        result.message = message;
        result.data = {};

        return result;
    }

    static Parse(data_string, uri)
    {
        var data = null;
        try {
            data = JSON.parse(data_string);
        } catch (err) {

        }

        if (data === null) {
            var result = Result.Error(
                    'Cannot parse json data from: ' + uri);
            result.data.data = data_string;

            if (SPK.Debug)
                console.error(data_string);

            return result;
        }

        var result = new Result();

        if (!('result' in data)) {
            result.result = 2;
            result.message = 'No result info in json data.';
        } else {
            result.result = data.result;
            if ('message' in data)
                result.message = data.message;
            result.data = data;
        }

        return result;
    }


    constructor()
    {
        this.result = 3;
        this.message = '';
        this.data = null;
    }

    isSuccess()
    {
        return this.result === 0;
    }

    isFailure()
    {
        return this.result === 1;
    }

    isError()
    {
        return this.result === 2;
    }

    isError_Connection()
    {
        return this.result = 3;
    }
    
};
module.exports = Result;