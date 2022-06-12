//:----------------------------------------------------------://
//:													         ://
//:  Z_I_G.JS ( Z_I_G == Zero_IDE_GAME )                     ://
//:                                                          ://
//:  Convention For This File :                              ://
//:                                                          ://
//:  	ALL_UPPERCASE_IS_A_FUNCTION                          ://
//:  	ALL_UPPERCASE_ALSO_CONSTANT                          ://
//:  	all_lowercase_is_a_variable                          ://
//:                                                          ://
//:	 Only reference public "const" function pointers         ://
//:  when calling functions. We do this so that code         ://
//:  must be strictly ordered by :                           ://
//:                                                          ://
//: 	 DEPENDEE_FUNCTIONS_BEFORE_DEPENDANT_FUCTIONS        ://
//:															 ://
//:----------------------------------------------------------://
//:SMOKE_TEST:===============================================://

	console.log( "[HELLO_WORLD_FROM:J_S/Z_I_G.JS]" );

//:===============================================:SMOKE_TEST://
//:DATA_SECTION:=============================================://

const ZIG_LIB ={
	/** ***************************************** **/
	/** WE WILL DO THIS PART IN THE NEXT TUTORIAL **/
	/** ***************************************** **/
};;
//:=============================================:DATA_SECTION://
//:ON_WINDOW_RESIZE_HANDLER:=================================://

const ZIG_OWR = function PRIVATE_ZIG_OWR(){

	console.log( "[RESIZED]" );

};;
//:=================================:ON_WINDOW_RESIZE_HANDLER://
//:DOMAIN_OBJECT_MODEL_SETUP:================================://

const ZIG_DOM = function PRIVATE_ZIG_DOM(){

	console.log( "[BEG:ZIG_DOM]" );

    var bod_htm =( document.body );
    if(!bod_htm){
        bod_htm = document.createElement("BODY");
        document.body=( bod_htm );  
    };;

    var htm_htm =( document.documentElement );
    if(!htm_htm){
        alert( "ohfuckthen" );
    };;

    if( bod_htm === htm_htm ){ alert("[THEY_ARE_SAME]"); };

    $( document ).prop( "title" , "[Atomic_Alice_Online]" );
                                //: A______A_____O_______://
    
    var j_q_htm =$( htm_htm  ); /** <HTML> Root Node **/
    var j_q_bod =$( bod_htm  ); /** <BODY> ____ Node **/
	var j_q_can =$("<CANVAS>").attr({
		width : "1024"
	,   height:  "512"
	,  display: "flex"
	});;

	j_q_bod.append([

			j_q_can
	]);

	$(window).resize( ZIG_OWR );

	console.log( "[END:ZIG_DOM]" );
};;
//:================================:DOMAIN_OBJECT_MODEL_SETUP://
//:INIT_AND_KILL:============================================://

const ZIG_INI = function PRIVATE_ZIG_INI(){

	$(document).ready( function CALBACK_ZIG_INI(){

		ZIG_DOM();
		
	});;
};;
const ZIG_KIL = function PRIVATE_ZIG_KIL(){


};;
	
//:============================================:INIT_AND_KILL://