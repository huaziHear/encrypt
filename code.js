// 问题：大小写的问题
// 其他字符的问题
function encodeastr(str,method){
	if(!str)return "";
	method = !!method;
	str = str + "";

	var type_arr = [
		["c","n","a","e","d","f"],
		["b","g","l","j","i","o"],
		["y","k","s","p","h","x"],
		["r","q","z","v","m","u"]
	]

	var tag_arr = [":","/",".","&","?","+","="];

	var index_arr = [
			["a","b","c"],
			["d","e","f"],
			["g","h","i"],
			["j","k","l"],
			["m","n","o"],
			["o","p","q"],
			["r","s","t"],
			["u","v","w"],
			["x","y","z"]
		];

	var letter_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var number_arr = [0,1,2,3,4,5,6,7,8,9];
	var especial_arr = [":","/",".","&","?","+","="];

	// ----------------------------------
	function enCodeIt(str){
		// 反转
		var r_str = reverseStr(str);
		var n_str = nextStr(r_str);
		var n_str_arr = n_str.split("");
		var len = n_str_arr.length;
		var symbol_letter = "";
		var temp_four;
		var end_str_arr = [];
		var temp_letter;
		var temp_type;
		var pos1,pos2,pos3,pos4;
		for(var i = 0; i < len; i++){
			temp_letter = n_str_arr[i];
			if(isNumberType(temp_letter)){
				// number
				pos1 = type_arr[0][randomNumber(0,6)];
				pos4 = letter_arr[parseInt(temp_letter)];
			}else if(isLetterType(temp_letter)){
				// letter
				pos1 = type_arr[1][randomNumber(0,6)];
				pos4 = letter_arr[index(temp_letter,letter_arr)];
			}else if(isEspecially(temp_letter)){
				// especially
				pos1 = type_arr[2][randomNumber(0,6)];
				pos4 = letter_arr[index(temp_letter,especial_arr)];
			}else{
				// other
				pos1 = type_arr[3][randomNumber(0,6)];
				pos4 = temp_letter;
			}

			pos2 = letter_arr[randomNumber(0,26)];
			pos3 = letter_arr[randomNumber(0,26)];
			temp_four = pos1 + pos2 + pos3 + pos4;

			end_str_arr.push(temp_four);
		}

		return end_str_arr.join("");
	}

	function decodeastr(str){
		var lower_str = str.toLowerCase();
		var str_arr = lower_str.split("");
		var four_str_arr = [];
		for(var i = 0,len = str_arr.length; i < len; i=i+4){
			four_str_arr.push((str_arr[i] + str_arr[i+1] + str_arr[i+2] + str_arr[i+3]));
		}

		var four_sum = four_str_arr.length;
		var decode_str_arr = [];
		var pos1_letter,pos2,pos3,pos4_letter;
		var temp_four,real_letter;
		for(var j = 0; j < four_sum; j++){
			temp_four = four_str_arr[j];
			pos1_letter = temp_four[0];
			var type_index = getLetterType(pos1_letter);
			pos4_letter = temp_four[3];
			real_letter = getTrueLetter(type_index,pos4_letter);
			decode_str_arr.push(real_letter);
		}

		var end_str = decode_str_arr.join("");

		// 向前
		var pre_str = preStr(end_str);
		// 反转
		var true_str = reverseStr(pre_str);

		return true_str;
	}

	function getTrueLetter(type,letter){
		switch(type){
			case 0:
				// number
				var temp_index = index(letter,letter_arr);
				return temp_index;
			case 1:
				// string
				var temp_index = index(letter,letter_arr);
				return letter_arr[temp_index];
			case 2:
				// especially
				var temp_index = index(letter,letter_arr);
				return especial_arr[temp_index];
			default:
				// other
				return letter;
		}
	}

	function getLetterType(letter){
		var temp_index;
		var temp_arr;
		for(var i = 0; i < 4; i++){
			temp_arr = type_arr[i];
			for(var j = 0,len = temp_arr.length; j < len; j++){
				if(letter == temp_arr[j]){
					return i;
				}
			}
		}
	}

	function isInArray(letter,arr){
		var len = arr.length;
		for(var i = 0; i < len; i++){
			if(arr[i] == letter){
				i = -1;
				break;
			}
		}

		return i === len ? false : true;
	}

	function isNumberType(o){
		return (o === o && !isFinite(o) && (o+1) === (1+parseInt(o)));
	}

	function isLetterType(o){
		return !isNumberType(o) && isInArray(o,letter_arr);
	}

	function isEspecially(o){
		return isInArray(o,especial_arr);
	}

	function isOtherType(o){
		return !isNumberType(o) && !isLetterType(o) && !isEspecially(o);
	}

	function randomIndexLetter(index){
		return index_arr[index][randomNumber(0,3)];
	}


	function randomNumber(start,to){
		return Math.abs(Math.floor(Math.random() * (to - start) + start));
	}

	function reverseStr(str){
		return str.split("").reverse().join("");
	}

	function preStr(str){
		var str_arr = str.split("");
		var str_len = str_arr.length;

		var next_arr = [];
		for(var i = 0; i < str_len; i++){
			next_arr.push(preLetter(str_arr[i]));
		}

		return next_arr.join("");
	}

	function nextStr(str){
		var str_arr = str.split("");
		var str_len = str_arr.length;

		var next_arr = [];
		for(var i = 0; i < str_len; i++){
			next_arr.push(nextLetter(str_arr[i]));
		}

		return next_arr.join("");
	}

	function preLetter(letter){
		if(!isLetterType(letter)){
			return letter;
		}

		var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		var i = index(letter,arr);
		var len = arr.length;
		if(i == 0){
			i = len - 1;
		}else{
			i = i - 1;
		}

		return arr[i];
	}

	function nextLetter(letter){
		if(!isLetterType(letter)){
			return letter;
		}
		
		var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		var i = index(letter,arr);
		var len = arr.length;
		if(i == len - 1){
			i = 0;
		}else{
			i = i + 1;
		}
		return arr[i];
	}

	function index(letter,arr){
		var len = arr.length;
		var ii = 0;
		for(var i = 0; i < len; i++){
			if(letter == arr[i]){
				ii = i;
				break;
			}
		}

		return ii;
	}
	// ----------------------------------
	// 边界条件
	// 参数有无
	// 参数类型
	// 返回值
	// 可用性
	// 健壮性
	// 扩展性
	function controLength(str,len){
		if(!str)return false;
		if(str && !len)return str;
		str = str + "";
		var str_len = str.length;
		var end_len = len;
		var dis_len = end_len - str_len;
		var temp_str;
		if(dis_len < 0){
			return str.substring(0,end_len);
		}else if(dis_len === 0){
			return str;
		}else{
			for(var i = 0; i < dis_len; i++){
				str += letter_arr[randomNumber(0,26)];
			}
			//16进制
			return str;
		}
	}

	// ----------------------------------
	if(method){
		return decodeastr(str).toLowerCase();
	}else{
		return enCodeIt(str).toUpperCase();
	}
}
