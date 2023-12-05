(function(exports){

	exports.serialize = function(data){
		if (data !== undefined) 
			return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v);
	}

	exports.deserialize = function(json){
		return JSON.parse(json, (_, value) => {
			if (typeof value === 'string') {
				const m = value.match(/(-?\d+)n/);
				if (m && m[0] === value)
					value = BigInt(m[1]);
			}
			return value;
		});
	}

})(typeof exports === 'undefined'? this['jsonBigInt']={}: exports);
