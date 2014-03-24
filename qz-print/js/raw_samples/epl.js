/**
********************************************************************************
*               QZ-PRINT JQUERY/EPL Printing
********************************************************************************
* Summary: 
*    A series of JavaScript/jQuery functions for interacting with the "QZ-PRINT"
*    Applet/Plugin and the EPL printing language.  This file is a sample only and 
*    was created ONLY for sample.html.  Therefore this file is NOT recommended 
*    for redistributing with 3rd party software, although you are free to do so 
*	 per one of the following licenses:
* 
* Licenses (Please choose ONLY one):
*    - LGPL 2.1
*          OR 
*    - Public Domain, no restrictions
*
* Author:
*    QZ Industries, LLC 2014
*  
*  Function List:
*	 printEPL()
*	 printHexEPL()
*	 printXMLEPL()
*	 print64EPL()
*	 printFileEPL(file)
*	 printToFileEPL()
*	 printPagesEPL()
*
*
*/


/***************************************************************************
* Prototype function for printing raw EPL commands
* Usage:
*    qz.append('\nN\nA50,50,0,5,1,1,N,"Hello World!"\n');
*    qz.print();
***************************************************************************/
function printEPL() {
	if (notReady()) { return; }
	
	// Send characters/raw commands to qz using "append"
	// This example is for EPL.  Please adapt to your printer language
	// Hint:  Carriage Return = \r, New Line = \n, Escape Double Quotes= \"
	qz.append('\nN\n');            
	qz.append('q609\n');
	qz.append('Q203,26\n');
	qz.append('B5,26,0,1A,3,7,152,B,"1234"\n');
	qz.append('A310,26,0,3,1,1,N,"SKU 00000 MFG 0000"\n');
	qz.append('A310,56,0,3,1,1,N,"QZ PRINT APPLET"\n');
	qz.append('A310,86,0,3,1,1,N,"TEST PRINT SUCCESSFUL"\n');
	qz.append('A310,116,0,3,1,1,N,"FROM SAMPLE.HTML"\n');
	qz.append('A310,146,0,3,1,1,N,"QZINDUSTRIES.COM"\n');
	qz.appendImage(getPath() + 'img/image_sample_bw.png', 'EPL', 150, 300);
	qz.append('\nP1,1\n');

	// Tell the applet to print.
	qz.print();
}

/***************************************************************************
* Prototype function for printing hexadecimal formatted raw data
* 
* Usage:
*    qz.appendHex('00AABBCCDDEEFF');
*    qz.appendHex('x00xAAxBBxCCxDDxEExFF');
*    qz.print();
***************************************************************************/ 
function printHexEPL() {
	if (notReady()) { return; }
	// Since 1.5.4, No backslashes needed (fixes \x00 NUL JavaScript bug)
	// Can be in format "1B00" or "x1Bx00"
	// EPL Sample Provided
	qz.appendHex("4e0d0a713630390d0a513230332c32360d0a42352c32362c");
	qz.appendHex("302c31412c332c372c3135322c422c2231323334220d0a41");
	qz.appendHex("3331302c32362c302c332c312c312c4e2c22534b55203030");
	qz.appendHex("303030204d46472030303030220d0a413331302c35362c30");
	qz.appendHex("2c332c312c312c4e2c22515a205072696e7420506c756769");
	qz.appendHex("6e220d0a413331302c38362c302c332c312c312c4e2c2254");
	qz.appendHex("657374207072696e74207375636365737366756c220d0a41");
	qz.appendHex("3331302c3131362c302c332c312c312c4e2c2266726f6d20");
	qz.appendHex("73616d706c652e68746d6c220d0a413331302c3134362c30");
	qz.appendHex("2c332c312c312c4e2c227072696e7448657828292066756e");
	qz.appendHex("6374696f6e2e220d0a50312c310d0a");
	
	// Send characters/raw commands to printer
	qz.print();
}

/***************************************************************************
* Prototype function for printing a single XML node containing base64
* encoded data.
* Usage:
*    qz.appendXML('/path/to/file.xml');
*    qz.print();
***************************************************************************/  
function printXMLEPL() {
	if (notReady()) { return; }
	
	// Appends the contents of an XML file from a SOAP response, etc.
	// First parameter:  A valid complete URL is required for the XML file.
	// Second parameter:  A valid XML tag/node name containing
	//    base64 encoded data, i.e. <node_1>aGVsbG8gd29ybGQ=</node_1>
	// Example:
	//    qz.appendXML("http://yoursite.com/zpl.xml", "node_1");
	qz.appendXML(getPath() + "/misc/zpl_sample.xml", "v7:Image");

	// Tell the applet to print.
	qz.print();
}

/***************************************************************************
* Prototype function for printing raw base64 encoded commands
* Usage:
*    qz.append64('SGVsbG8gV29ybGQh');
*    qz.print();
***************************************************************************/     
function print64EPL() {
	if (notReady()) { return; }
	 
	// Send base64 encoded characters/raw commands to qz using "append64"
	// This will automatically convert provided base64 encoded text into 
	// text/ascii/bytes, etc.  This example is for EPL and contains an 
	// embedded image.  Please adapt to your printer language
	qz.append64('Ck4KcTYwOQpRMjAzLDI2CkI1LDI2LDAsMUEsMyw3LDE1MixCLCIxMjM0IgpBMzEwLDI2LDAsMywx' +
		'LDEsTiwiU0tVIDAwMDAwIE1GRyAwMDAwIgpBMzEwLDU2LDAsMywxLDEsTiwiUVogUFJJTlQgQVBQ' +
		'TEVUIgpBMzEwLDg2LDAsMywxLDEsTiwiVEVTVCBQUklOVCBTVUNDRVNTRlVMIgpBMzEwLDExNiww' +
		'LDMsMSwxLE4sIkZST00gU0FNUExFLkhUTUwiCkEzMTAsMTQ2LDAsMywxLDEsTiwiUVpJTkRVU1RS' +
		'SUVTLkNPTSIKR1cxNTAsMzAwLDMyLDEyOCz/////////6SSSX///////////////////////////' +
		'//////////6UlUqX////////////////////////////////////8kqkpKP/////////////////' +
		'//////////////////6JUpJSVf//////////////////////////////////9KpKVVU+////////' +
		'//////////////////////////8KSSlJJf5/////////////////////////////////9KUqpVU/' +
		'/7////////////////////////////////9KqUkokf//P///////////////////////////////' +
		'+VKUqpZP//+P///////////////////////////////ElKUlSf///9f/////////////////////' +
		'////////+ipSkqin////y/////////////////////////////+lVUpUlX/////r////////////' +
		'/////////////////qlJKUql/////+n////////////////////////////BFKVKUl//////8v//' +
		'/////////////////////////zVSlKUp///////0f//////////////////////////wiSlSUpf/' +
		'//////q///////////////////////////KqlJUpV///////+R//////////////////////////' +
		'4UlKSpSX///////9T/////////6L///////////////BKlKpSqP///////1X////////0qg/23/V' +
		'VVVVVVf//8CSlJKklf///////kv///////+pS0/JP8AAAAAAB///wFSlSSpV///////+pf//////' +
		'/pUoq+qfwAAAAAAH//+AClSqpUT///////9S///////8pJUlkr+AAAAAAA///4AFJSSSUv//////' +
		'/yl///////KVUpTUv8AAAAAAH///gBKSqlVU////////lX//////6UkqoiU/wAAAAAA///+ABKpJ' +
		'Uko////////JH//////UpIiqlJ/AAAAAAD///wACkSUpJX///////6q//////6pVVSqiv4AAAAAA' +
		'f///AAJVVIqpP///////pI//////pSVtSSq/wAAAAAD///8AAJSlVJVf///////Sp/////8Sq//U' +
		'qL/ttttoAP///wAAUpVSpJ///////+pT/////qkn//UlH/////AB////AABKUSpSX///////5Sn/' +
		'///+lJ//+pS/////4AP///8AABKUkpVP///////ylP////1Kv//+qr/////AA////4AAKVVJUl//' +
		'/////+lKf////KS///8kv////8AH////gAAKSSpJR///////9Kq////9Kv///5Kf////gAf///+A' +
		'AAUlUqov///////1JT////lS////qn////8AD////4AABKpKSqf///////Skj///+kr////JH///' +
		'/wAf////wAACkqUlK///////8pKv///ypf///9V////+AD/////AAAFKUVSj///////wqlP///JT' +
		'////yR////wAP////8AAAFKqkpv///////JSlf//9Sv////U/////AB/////4AAAVIpKRf//////' +
		'+ElV///pS////8of///4AP/////gAAASZVKr///////4qkj///Sn////0v////AA//////AAABUS' +
		'VJH///////glJn//8pP////KH///8AH/////+AAACtUlVf//////+ClRP//qV////9K////gA///' +
		'///4AAACEpJK///////8BSqf/+lX////yr///8AD//////wAAAVUqVH///////gUlU//5Rf////R' +
		'P///gAf//////gAAApKqTP//////8AVSV//pU////6qf//+AD//////+AAAAqkki//////8AEpVL' +
		'/+qP////1L///wAP//////4AAACSVVB/////+AFUpKX/9KP////Sv//+AB///////AAAAEqSgH//' +
		'//+ACkpSUv/lV////6k///4AP//////+AAAAUlSgf////gAJKRUpf/ST////1J///AA///////4A' +
		'AAAVJVB////gAtVFUpV/8lX///+Vf//4AH///////gAAABKSSD///wASSVVJSR/1Vf///8kf//gA' +
		'///////+AAAABVUof//4AElUpKqqv/SL////1L//8AD///////4AAAABJJQ//8AFVJKVKSSP+qj/' +
		'///Kv//gAf///////gAAAAKSpT/+ACkqSlKUkqf5Rf///6S//+AD///////+AAAAAKqpP/ABJKVS' +
		'klKqU/xUf///qp//wAP///////4AAAAAkko+gASVKUlVKlKX/VK///9Sf/+AB////////gAAAACp' +
		'UrgAKqVKVJKSlKf+Sl///0kf/4AP///////+AAAAABSVIAFJUlKqSUpKV/0pX//8qr//AA//////' +
		'//8AAAAACklACSopKSVUqVKX/qpH//okv/4AH////////gAAAAAVVKBUpUqUkkpKSk//SSv/xVK/' +
		'/AAAAAAD////AAAAAAJKWSUpVKVVUqVSp/+qqH9SlR/8AAAAAAH///4AAAAABSUklJSSlJJKUkpf' +
		'/8klQFSo//gAAAAAA////wAAAAABVKqlUkqlSqkqqU//6pUqkkof8AAAAAAB/r//AAAAAAElEpSK' +
		'qSlSSpJKL//pUqpVKr/wAAAAAAP8v/8AAAAAAJLKUqkkpSqkqSVf//yUkpKSv+AAAAAAAfqf/wAA' +
		'AAAAVClKVVUoklUqqp///UpKVVS/wAAAAAAD+S//AAAAAAAlpSkkkpVKkpKSX///JVKTpR+AAAAA' +
		'AAH9X/8AAAAAABRUpVJUqqSpSUlf///SSk/Sv4AAAAAAA/y//wAAAAAAFSVUlSUkUkpUqr////VS' +
		'v9S/AAAAAAAB/3//AAAAAAAFUkpSlJMqqUpJP////13/pT////////////8AAAAAAAEpJSlSqUkk' +
		'pVS////////Un////////////wAAAAAABJVSlSpUqpUpJX///////8q/////////////gAAAAAAC' +
		'pSqkkpKSUpSSP///////5L////////////+AAAAAAACSkVVKSklKpVV///////+SX///////////' +
		'/4AAAAAAAFSqJKlSqqiVSX///////9U/////////////gAAAAAAASpVSlSkklVJU////////yr//' +
		'//////////+AAAAAAAAkpJSklKpKSUp////////kn////////////4AAAAAAABJSqlKqkqUqVf//' +
		'/////5K/////////////gAAAAAAACpUlKpJKUqlI////////1L////////////+AAAAAAAAFSVKS' +
		'SqkpFKX////////SX////////////4AAAAAAAAiklKlSSpTKKv///////9U/////////////wAAA' +
		'AAAABSpSlSqlSiVJ////////pV/////////////AAAAAAAAVUpSkklSlUqX////////Uv///////' +
		'/////8AAAAAAAAkqUpVJJSqpVf///////8pf////////////4AAAAAAAFJKUpKqUpJUT////////' +
		'4r/////////////wAAAAAAAKqVKVKUqSSVX///////+Uv/////////////gAAAAAAASUlKSkpKql' +
		'S////////+qf/////////////AAAAAAAEkpKUlUpJJCn////////iH///////////wAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/4B+A8AH/AAAAA' +
		'AAAAAAAAAAAAAA//AAfwD4H4HwAAf/4H4DwB//gAAAAAAAAAAAAAAAAAD/+AB/APgfgfAAB//wfw' +
		'PAf/+AAAAAAAAAAAAAgAAAAP/8AH8AfB+D4AAH//B/g8D//4AAAAAAAAAAAADwAAAA//4A/4B8H4' +
		'PgAAfB+H+DwP4HgAAAAAAAAAAAAPwAAAD4fgD/gHw/w+AAB8D4f8PB+AGAAAAAAAAAAAAA/wAAAP' +
		'g+Af/AfD/D4AAHwPh/48HwAAAAAAAAAAAAAAB/4AAA+D4B98A+P8PAAAfA+Hvjw+AAAAAAAAAAAA' +
		'AAAB/4AAD4PgH3wD4/x8AAB8H4e/PD4AAAAAAAAAAAAAAAB/8AAPh8A+PgPn/nwAAH//B5+8Pg/4' +
		'AH/j/x/4/8f+AA/8AA//wD4+A+eefAAAf/4Hj7w+D/gAf+P/H/j/x/4AA/wAD/+APj4B5554AAB/' +
		'/AeP/D4P+AB/4/8f+P/H/gAD/AAP/wB8HwH3nvgAAH/wB4f8Pw/4AH/j/x/4/8f+AA/8AA//AH//' +
		'Af+f+AAAfAAHg/wfAPgAAAAAAAAAAAAAf/AAD5+A//+B/w/4AAB8AAeD/B+A+AAAAAAAAAAAAAH/' +
		'gAAPj8D//4D/D/AAAHwAB4H8H+D4AAAAAAAAAAAAB/4AAA+H4P//gP8P8AAAfAAHgPwP//gAAAAA' +
		'AAAAAAAP8AAAD4fh+A/A/w/wAAB8AAeA/Af/+AAAAAAAAAAAAA/AAAAPg/HwB8B+B+AAAHwAB4B8' +
		'Af/4AAAAAAAAAAAADwAAAA+B+fAHwH4H4AAAfAAHgHwAf4AAAAAAAAAAAAAIAAAAD4H/8Afgfgfg' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAClAxLDEK');
	
	// Tell the apple to print.
	qz.print();
}

/***************************************************************************
* Prototype function for printing a text or binary file containing raw 
* print commands.
* Usage:
*    qz.appendFile('/path/to/file.txt');
*    qz.print();
***************************************************************************/ 
function printFileEPL() {
	if (notReady()) { return; }
	
	// Append raw or binary text file containing raw print commands
	qz.appendFile(getPath() + "misc/epl_sample.txt");
	
	// Tell the applet to print.
	qz.print();
}


/***************************************************************************
* Prototype function for printing raw commands directly to the filesystem
* Usage:
*    qz.printToFile("C:\\Users\\Jdoe\\Desktop\\test.txt");
*    qz.append("\n\nHello world!\n\n");
***************************************************************************/
function printToFileEPL() {

	if (qz) {
		// We don't need a printer since we are writing to the filesystem instead
		// Send characters/raw commands to qz using "append"
		// Hint:  Carriage Return = \r, New Line = \n, Escape Double Quotes= \"
		qz.append("A590,1600,2,3,1,1,N,\"QZ Print Plugin " + qz.getVersion() + " sample.html\"\n");
		qz.append("A590,1570,2,3,1,1,N,\"Testing qz.printToFile() function\"\n");
		qz.append("P1\n");
		
		// Send characters/raw commands to file
		// i.e.  qz.printToFile("\\\\server\\printer");
		//       qz.printToFile("/home/user/test.txt");
		qz.printToFile("C:\\qz-print_test-print.txt");

	}
	
}


/***************************************************************************
* Prototype function for controlling print spooling between pages
* Usage:
*    qz.setEndOfDocument('P1,1\r\n');
*    qz.setDocumentsPerSpool('5');
*    qz.appendFile('/path/to/file.txt');
*    qz.print();
***************************************************************************/     
function printPagesEPL() {
	if (notReady()) { return; }
	
	// Mark the end of a label, in this case  P1 plus a newline character
	// qz-print knows to look for this and treat this as the end of a "page"
	// for better control of larger spooled jobs (i.e. 50+ labels)
	qz.setEndOfDocument('P1,1\r\n');
	
	// The amount of labels to spool to the printer at a time. When
	// qz-print counts this many `EndOfDocument`'s, a new print job will 
	// automatically be spooled to the printer and counting will start
	// over.
	qz.setDocumentsPerSpool("2");
	
	qz.appendFile(getPath() + "misc/epl_multiples.txt");
	
	// Tell the applet to print.
	qz.print();
}