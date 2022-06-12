//:ABOUT_ZIG_SERVER:=========================================://
//:                                                          ://
//:	   Node.js server for JavaScript version of              ://
//:    Atomic Alice re-write. ZIG == Zero_IDE_Game           ://
//:    But we can make up some type of lie that makes        ://
//:    the acronym sound cooler later.                       ://
//:    ( "AA3" namespace is reserved for the C version )     ://
//:    ( of the game and thought "ZIG" was nice.       )     ://
//:                                                          ://
//:    What I am working towards[ imgur.com/gallery/HhDLFQE ]://
//:                                                          ://
//:=========================================:ABOUT_ZIG_SERVER://
//:DATA_SECTION:=============================================://

const PORT     = process.env.PORT || 5000 ;         
const LIB_HTTP = require('http'); //:HyperTextTransferProto..://
const LIB_URL  = require('url' ); //:UniversalResourceLocator://
const LIB_FS   = require('fs'  ); //:File System ://
const LIB_QS   = require('node:querystring' );

const TXT = { "Content-Type": "text/javascript"          } ;
const PNG = { "Content-Type": "image/png"                } ;
const HTM = { "Content-Type": "text/html"                } ;
const J_S = { "Content-Type": "text/javascript"          } ;
const EXE = { "Content-Type": "application/x-msdownload" } ;
const CSS = { "Content-Type": "text/css"                 } ;

//:=============================================:DATA_SECTION://
//:FUNC_SECTION_MAIN_ENTRY_POINT:============================://
          
LIB_HTTP.createServer(function ( i_ask, i_giv ) { 

	//:BUILD_STATE_OBJECT_BUNDLE(sob):-------------------://

		var sob ={
			ask : i_ask //: Request  ://
		,   giv : i_giv //: Response ://
		,   url : LIB_URL.parse( i_ask.url , true ).pathname
				  .toUpperCase()
		,   pam : LIB_QS.parse( i_ask.url , true ).query  

		,   rfp     :   "[RELATIVE_FILEPATH_NOT_LOADED]"
		,   url_seg : [ "[URL_PATH_SEGMENTS_NOT_LOADED]" ]
		};;
	//:-------------------:BUILD_STATE_OBJECT_BUNDLE(sob)://
	//:CREATE_PARAMDICT_IF_NOT_EXIST:--------------------://

    sob.pam = sob.pam ? sob.pam : { };
    sob.pam[ "default_key" ]=( "default_value" );

    console.log( "[LOG:sob.url]:" , sob.url );
    console.log( "[LOG:sob.pam]:" , sob.pam );

	//:--------------------:CREATE_PARAMDICT_IF_NOT_EXIST://
	//:BUILD_URL_SEGMENTS_ARRAY:-------------------------://

		var url_seg = [ ];
		url_seg = sob.url.split( "/" ).filter( n => n );
		sob.url_seg = url_seg ;

	//:-------------------------:BUILD_URL_SEGMENTS_ARRAY://
	//:LOAD_RELATIVE_FILE_PATH(rfp):---------------------://

		var rfp = "." ;  
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;
		sob.rfp =( rfp );
	//:---------------------::LOAD_RELATIVE_FILE_PATH(rfp)//
	//:TOP_LEVEL_URL_ROUTING:----------------------------://
	
	if( "TXT" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_TXT( sob , sob.rfp );
	}else
	if( "J_S" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_J_S( sob , sob.rfp );
	}else
	if( "IMG" == sob.url_seg[ 0 ] ){

		sob.giv.writeHead( 200 );
		sob.giv.write( "[NO_IMAGE_FOLDER_USE:PNG]" );
		sob.giv.end( );
	}else
	if( "PNG" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_PNG( sob , sob.rfp );
	}else
	if( "HTM" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_HTM( sob , sob.rfp );
	}else
    if( "CSS" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_CSS( sob , sob.rfp );
    }else
    if( "EXE" == sob.url_seg[ 0 ] ){

		ZIG_ServeFile_EXE( sob , sob.rfp );
    }else
	if( "DEBUG_URL_SEG"   == sob.url_seg[ 0 ] ){

		sob.giv.writeHead( 200 );
		sob.giv.write( "[url_seg]..." );
		sob.giv.write( "(" );
		var m_i =( url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			sob.giv.write( sob.url_seg[ s_i ] );
			if( m_i != s_i ){ sob.giv.write( "+" ); };
		};;
		sob.giv.write( ")" );
		sob.giv.end( );
	}else
    if( "DEBUG_SERVEFILE" == sob.url_seg[ 0 ] ){

        ZIG_ServeFile_TXT( sob , "./server.js" );
    }else
	if( "DEBUG_URL" == sob.url_seg[ 0 ] ){
        sob.giv.writeHead( 200 , TXT );

        sob.giv.write( "[sob.url]:" +         sob.url   );
		sob.giv.write( "\n" );

        sob.giv.write( "[sob.pam]:" + 
            ZIG_DictionaryToString( sob.pam ) );
		sob.giv.write( "\n" );

		//:ADDING THIS == ERROR, why?://
		sob.giv.write( "[sob.url_seg.length]:"
	            +String( sob.url_seg.length ) );;
		sob.giv.write( "[sob.url_seg]:..." );
		var m_i =( url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			sob.giv.write( sob.url_seg[ s_i ] );
		};;
		
        sob.giv.end( );
    }else{

		//:----------------------------------------------://
		//: Default Behavior : Serve Game Page :---------://
		//:----------------------------------------------://
	
		ZIG_ServeFile_HTM( sob , "./HTM/ZIG.HTM" );
	};;

	//:----------------------------:TOP_LEVEL_URL_ROUTING://
   
}).listen(PORT);   

//:============================:FUNC_SECTION_MAIN_ENTRY_POINT://
//:FUNC_SECTION_SERVEFILE:===================================://

function ZIG_ServeFile_IMG( sob , rfp_img ){

	//:---------------------------------------://
	//:We are only going to support .PNG files://
	//:---------------------------------------://

	sob.giv.writeHead( 200 , TXT );
	sob.giv.write( "[ERR:USE:ZIG_ServeFile_PNG]" );
	sob.giv.end( );
}

function ZIG_ServeFile_PNG( sob , rfp_png , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_png,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[WE_DONE_FUCKED_UP_2022_05_25]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try_To_Serve_Our[ 404.PNG ]      ://
				//:----------------------------------://
				o_depth++;
				ZIG_ServeFile_PNG(
					sob 
				,   "./PNG/404.PNG" 
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , PNG );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , PNG );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function ZIG_ServeFile_J_S( sob , rfp_j_s , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_j_s,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof ="console.log('[FAILED_TO_FIND_JS_FILE]');";
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try_To_Serve_Our[ 404.J_S ]      ://
				//:----------------------------------://
				o_depth++;
				ZIG_ServeFile_J_S(
					sob 
				,   "./J_S/404.J_S"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , J_S );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , J_S );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function ZIG_ServeFile_HTM( sob , rfp_htm , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_htm,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[ServeFile_HTM_FAILURE]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try_To_Serve_Our[ 404.HTM ]      ://
				//:----------------------------------://
				o_depth++;
				ZIG_ServeFile_HTM(
					sob 
				,   "./HTM/404.HTM"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , HTM );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , HTM );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function ZIG_ServeFile_CSS( sob , rfp_css , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_css,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[YOU_FUCKED_UP_2022_CSS]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try_To_Serve_Our[ 404.CSS ]      ://
				//:----------------------------------://
				o_depth++;
				ZIG_ServeFile_CSS(
					sob 
				,   "./CSS/404.CSS"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , CSS );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , CSS );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function ZIG_ServeFile_EXE( sob , rfp_exe  ){

    var r_s = LIB_FS.createReadStream( rfp_exe );
    r_s.pipe( sob.giv );
}

function ZIG_ServeFile_TXT( sob , rfp_txt , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_txt,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[ServeFile_TXT_FAILURE]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try_To_Serve_Our[ 404.TXT ]      ://
				//:----------------------------------://
				o_depth++;
				ZIG_ServeFile_TXT(
					sob 
				,   "./TXT/404.TXT"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , TXT );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , TXT );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}
//:===================================:FUNC_SECTION_SERVEFILE://
//:FUNC_SECTION:=============================================://                              

function ZIG_DictionaryToString( pam ){

    var pam_str="[pam_str]:" ;
    
    if( pam ){
        var arr_k_v=( Object.entries( pam ) );
            
        for( var k_v of arr_k_v ){
        
            pam_str +=( "[k_v[0]]:" + k_v[ 0 ] );
            pam_str +=( "[k_v[1]]:" + k_v[ 1 ] );
        };;
    }else{
        pam_str += "[ITS_NULL]" ;
    };;
    
    return( pam_str );
}
//:=============================================:FUNC_SECTION://
//: COMMENTS_ARE_READ_LAST_OR_NEVER ************************ ://
/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ************************ ***
*** COMMENTS_ARE_READ_LAST_OR_NEVER ************************ ***

	@ask@ : My unconventional variable for ( request /req )
	@giv@ : My unconventional variable for ( response/res )
    
    @sob@ : State_Object_Bundle
    @mit@ : MimeType
    @cof@ : Contents_Of_File
    @rfp@ : Relative_File_Path
    @rfp_txt@ : RelativeFilePath_TXT ( text  file )
	@rfp_img@ : RelativeFilePath_IMG ( image file )
	@rfp_png@ : RelativeFilePath_PNG ( .PNG  file )

    @obj_err@ : Object_Error
	@o_depth@ : Optional Depth Value

	@K_I_S_S@ : Keep_It_Simple_Stupid

*** ************************ COMMENTS_ARE_READ_LAST_OR_NEVER ***
*** ************************ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **/
//: ************************ COMMENTS_ARE_READ_LAST_OR_NEVER ://