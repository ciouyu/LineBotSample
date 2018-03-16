var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
var PlayerNumber= 0;
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // Get all of the rows from the spreadsheet.
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				PlayerNumber= rows.length;

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = rows[i].gold;
					CharArr[i][3] = rows[i].mirastone;
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					
				}
				console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
			}

			
			});
	
		
		
	});

console.log(CharArr);

function ArrayUpdate() {

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // Get all of the rows from the spreadsheet.
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					

					
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = rows[i].gold;
					CharArr[i][3] = rows[i].mirastone;
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					
				}
					
				}
				console.log(CharArr);
				console.log('玩家基本資料 更新完成');

			
			});
	
		
		
	});
}
	

function main(UserID) {
	
	
	
	/*var readF = function(cb){ 
		var Temp;
		
		DB.useServiceAccountAuth(creds, function (err) {
		
		
		var CName;
		var Gold;
		var MiraStone;
		var Title;
		var TempRply;
		
 
		  // Get all of the rows from the spreadsheet.
			DB.getRows(1 , 
				function (err, rows) {
					if (err) {
						console.log( err );
					}else{

						for(var i=0; i< rows.length; i++){

							if (rows[i].userid == UserID) {
								CName = rows[i].cname;
								Gold = rows[i].gold;
								MiraStone = rows[i].mirastone;
								Title = rows[i].title;
								TempRply ='基本資料:\
								\n你的角色名:' + CName + '\
								\n持有金幣: '+Gold + 'G\
								\n持有奇蹟石: '+MiraStone + '顆\
								\n當前稱號: '+Title;

							}
						}
					}

			console.log('TempRply:(1)'+TempRply);
			Temp = TempRply;
			console.log('Temp:(2)'+Temp);
				
				
				
			});
	
		
		
	});
		
	cb(Temp);
		
		
}*/
	
	
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='基本資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4];
			ArrayUpdate();

			return rply;

		}
	}
	
	rply.text = '你的Line帳號尚未建立角色，請輸入 玩家建立 角色名 稱號(選填)  以建立角色';
	
	ArrayUpdate();

	return rply;

	
	
  
	
	///

}

function CreatNewPlayer(UserID,CName,Title) {
	var CTitle;
	var CharArrleng = CharArr.length;
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';

		return rply;
		}
	}
	
	
	if(CName == null) {
		
		rply.text = '有資料沒有填進去喔!';
				
		return rply;
        }
	
	if(Title == null) {
		
		CTitle = '冒險者';

        }else if(Title != null){
		CTitle = Title;
	}
	
	CharArr[CharArrleng] = [];
	
	console.log(CharArrleng);
	
	CharArr[CharArrleng][0] = UserID;
	CharArr[CharArrleng][1] = CName;
	CharArr[CharArrleng][2] = 1000;
	CharArr[CharArrleng][3] = 5;
	CharArr[CharArrleng][4] = CTitle;
	CharArr[CharArrleng][5] = 0;
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(1, { Userid: UserID, cname: CName, gold: 1000, mirastone: 5, Title: CTitle , InheritIO: 0 }, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
	
			
	///確認玩家資料
	
      
	rply.text = '玩家資料 ' + CName + ' 建立完成，稍等一下才會生效喔！';
				
	return rply;
	
	///

}

function InheritModeOn(Cname,password){
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{
		if(password == null){
			rply.text = '請輸入GM專用密碼！';

			return rply;
	
		}else if(password != '112201211'){
			rply.text = '密碼錯誤！';

			return rply;
	
		}else{
			for(var i=0; i< CharArr.length; i++){
				if (CharArr[i][1] == Cname) {
					if (CharArr[i][5] == 1) {
						rply.text = '此角色已經開啟繼承模式了！';

						return rply;
					}
					CharArr[i][5] = 1;
					DB.useServiceAccountAuth(creds, function (err) {
		
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 1;
									rows[i].save();
								}
							});
					});
					rply.text = '角色' + Cname + '開啟繼承模式！請輸入 繼承 角色名 進行繼承';
			
					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
	}
}

function InheritChatacter(UserID,Cname){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID && CharArr[i][1] != Cname){
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		
		}
	}
	
	
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{

		for(var i=0; i< CharArr.length; i++){
			if (CharArr[i][1] == Cname) {
				if (CharArr[i][5] == 0) {
					rply.text = '此角色尚未開啟繼承模式！';

					return rply;
				}else if(CharArr[i][0] == UserID){
					rply.text = '此角色是屬於你目前使用的Line帳號喔！';
					CharArr[i][5] = 0;
					DB.useServiceAccountAuth(creds, function (err) {
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 0;
									rows[i].save();
								}
							});
					});

					return rply;
				}
				CharArr[i][5] = 0;
				CharArr[i][0] = UserID;
				DB.useServiceAccountAuth(creds, function (err) {
					DB.getRows(1 , 
						function (err, rows) {
							if (err) {
								console.log( err );
							}else{
								rows[i].inheritio = 0;
								rows[i].userID = UserID;
								rows[i].save();
							}
						});
				});
				rply.text = '角色' + Cname + '繼承完成！請輸入 玩家情報以進行確認';

				return rply;

			}

		}
		rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';

		return rply;
		
	}
}



module.exports = {
	main,
	CreatNewPlayer,
	ArrayUpdate,
	InheritModeOn,
	InheritChatacter
};
