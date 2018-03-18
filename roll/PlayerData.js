var rply ={type : 'text'}; //type是必需的,但可以更改
var BoxOpen = require('./BoxOpen.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
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
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = rows[i].wmaterials;
					CharArr[i][8] = rows[i].wmaterialm;
					CharArr[i][9] = rows[i].wmateriall;
					CharArr[i][10] = rows[i].gmaterials;
					CharArr[i][11] = rows[i].gmaterialm;
					CharArr[i][12] = rows[i].gmateriall;
					
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
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = rows[i].wmaterials;
					CharArr[i][8] = rows[i].wmaterialm;
					CharArr[i][9] = rows[i].wmateriall;
					CharArr[i][10] = rows[i].gmaterials;
					CharArr[i][11] = rows[i].gmaterialm;
					CharArr[i][12] = rows[i].gmateriall;
					
				}
					
				}
				console.log(CharArr);
				console.log('玩家基本資料 更新完成');

			
			});
	
		
		
	});
}
	

function main(UserID) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='你的基本資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12];
			
			if(CharArr[i][5] == 1) rply.text += '\n!!!警告 繼承模式開啟中，請盡速繼承!!!';

			return rply;

		}
	}
	
	rply.text = '你的Line帳號尚未建立角色，請輸入 玩家建立 角色名 稱號(選填)  以建立角色';

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
	  DB.addRow(1, { Userid: UserID, cname: CName, gold: 1000, mirastone: 5, Title: CTitle , InheritIO: 0 , WmaterialS:0, WmaterialM:0,WmaterialL:0,GmaterialS:0,GmaterialM:0,GmaterialL:0}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
	
			
	///確認玩家資料
	
      
	rply.text = '玩家資料 ' + CName + ' 建立完成！';
				
	return rply;
	
	///

}

function InheritModeOn(userID,Cname,password){
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{
		for(var i=0; i< CharArr.length; i++){
			if(CharArr[i][1] == Cname && CharArr[i][0] !=userID){
				rply.text = '此角色不是屬於你的喔!';

				return rply;
			}
		
		}
		
		if(password == null){
			rply.text = '請輸入要用來繼承的專用密碼！(一旦建立就不能修改，請勿必記下)';

			return rply;
	
		}else{
			for(var i=0; i< CharArr.length; i++){
				if (CharArr[i][1] == Cname) {
					if (CharArr[i][5] == 1) {
						rply.text = '此角色已經開啟繼承模式了！如果忘記密碼，請找GM處理';

						return rply;
					}
					CharArr[i][5] = 1;
					CharArr[i][6] = password;
					DB.useServiceAccountAuth(creds, function (err) {
		
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 1;
									rows[i].inheritpassword = password;
									rows[i].save();
								}
							});
					});
					rply.text = '角色' + Cname + '開啟繼承模式！請輸入 繼承 角色名 繼承密碼 進行繼承';
			
					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
	}
}

function InheritChatacter(UserID,Cname,password){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID && CharArr[i][1] != Cname){
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		
		}
	}
	
	
	if(Cname == null){
		rply.text = '請輸入要繼承的角色名！';

		return rply;
		
	}else{

		for(var i=0; i< CharArr.length; i++){
			if (CharArr[i][1] == Cname) {
				if (CharArr[i][5] == 0) {
					rply.text = '此角色尚未開啟繼承模式！';

					return rply;
				}else if (password != CharArr[i][6] ) {
					rply.text = '繼承密碼有誤，請重新嘗試！';

					return rply;
					
				}else if(CharArr[i][0] == UserID){
					rply.text = '此角色是屬於你目前使用的Line帳號喔！關閉繼承模式';
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
				CharArr[i][6] = '';
				DB.useServiceAccountAuth(creds, function (err) {
					DB.getRows(1 , 
						function (err, rows) {
							if (err) {
								console.log( err );
							}else{
								rows[i].inheritio = 0;
								rows[i].userID = UserID;
								rows[i].inheritPassword = password;
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

function BoxOpen(UserID){
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='玩家 ' + CharArr[i][1] + '開啟寶箱！';
			
			rply.text += BoxOpen.main()[9];

			return rply;

		}
	}
	
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;

}


module.exports = {
	main,
	CreatNewPlayer,
	ArrayUpdate,
	InheritModeOn,
	InheritChatacter,
	BoxOpen
};
