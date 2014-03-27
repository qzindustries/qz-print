/**
********************************************************************************
*               QZ-PRINT JQUERY/GRAPHICAL USER INTERFACE DEMO
********************************************************************************
* Summary: 
*    A series of JavaScript/jQuery functions for interacting with the "QZ-PRINT"
*    Applet/Plugin.  This file is a sample only and was created ONLY for
*    sample.html.  Therefore this file is NOT recommended for redistributing with
*    3rd party software, although you are free to do so per one of the following
*    licenses:
* 
* Licenses (Please choose ONLY one):
*    - LGPL 2.1
*          OR 
*    - Public Domain, no restrictions
*
* Author:
*    QZ Industries, LLC 2014
*/


/**
* Automatically gets called when document is finished loading.
* We can use this to initialize our interface elements
*/
$(document).ready(function() {
	// Set up the tab elements
	$('#tabs').tabs();
	
	$('#label_print_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#receipt_print_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#ticket_print_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#document_print_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#list_serial_ports_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#open_port_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#send_data_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#close_port_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#list_network_info_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
	
	$('#raw_advanced_print_button').button();
	$('#printer_select').menu(
		{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}}
	);
		
	//$('.printer_select').menu('disable');
	$('#printer_menu').menu(
		/*{ select: function( event, ui ) {qz.setPrinter(ui.item.children().data('index'));}},*/
		{ icons: { submenu: "ui-icon-triangle-1-e" } }
	);
	
	$('#queue').addClass("ui-widget-content ui-corner-bottom");
	$('#EPL_raw_options').addClass("ui-widget-content ui-corner-bottom");
	$('#postscript_options').addClass("ui-widget-content ui-corner-bottom");
	
	// Set the progress bar to 33%, Loading Applet, "QZ-Yellow"
	$('#progressbar').progressbar({value: 33});
	$('.progress-label').text("Loading Applet...");
	//$('.ui-progressbar-value').css('backgroundColor', '#DBD78E');
	
	
		
	$('#printer_select').on('change', function() {
		var selected = $(this).find('option:selected');
		if (selected.data('index')) {
			qz.setPrinter(selected.data('index'));
		}
		$('#printer_select').effect("highlight", {color : "#99EB29"});
	});
	
	
	function showAdvancedOptions2(caller) {
		
		if ($('#label_print_advanced').is(":checked"))
		{
			$('#EPL_raw_options').show();
			$('#postscript_options').hide();
			$('#label_print_button').hide();
		} else if ($('#label_print_advanced').not(":checked")) {
			$('#label_print_button').show();
			$('#EPL_raw_options').hide();
			$('#postscript_options').hide();
		}
		
		
		/**
		* Determine which print format radio button is checked when 'Advanced Printing Options' is checked
		*/
		//if (($('#label_print_advanced').is(":checked")) && (document.getElementById("EPL-RAW").checked))
		//{
		//	$('#EPL_raw_options').show();
		//	$('#postscript_options').hide();
		//} else if (($('#label_print_advanced').is(":checked")) && (document.getElementById("ZPL-RAW").checked)) {
		//	$('#EPL_raw_options').hide();
		//	$('#postscript_options').show();
		//}
		
		
		
		//alert("caller: " + caller);
	    //var val = caller.id;
		//alert("val: " + val);
		//var tabName = caller.id.replace('advanced', 'format');
		//alert("tabName: " + tabName);
		//var val = $(caller).val();
		
		// Does value have 
		/*
		if (val.indexOf('EPL-RAW') !== -1) {
			$('#EPL_raw_options').show();
			$('#postscript_options').hide();
		} else if (val.indexOf('-PS') !== -1) {
			$('#postscript_options').show();
			$('#EPL_raw_options').hide();
		} else {
			alert("DISABLED!");
		}
		*/
	}
	
	/**
	* Shows/Hides the advanced options
	*/
	function showAdvancedOptions(caller) { 

		var val = $(caller).val();
		if (val.indexOf('EPL-RAW') !== -1) {
			$('#EPL_raw_options').show();
			$('#postscript_options').hide();
		} else if (val.indexOf('-PS') !== -1) {
			$('#postscript_options').show();
			$('#EPL_raw_options').hide();
		} else {
			alert("DISABLED!");
		}

	}
	
	
	/**
	* Show advanced options depending on which radio button is selected.
	*/
	$('#label_print_advanced').click(function(event) { showAdvancedOptions2($(this));});
	$('#receipt_print_advanced').click(function(event) { showAdvancedOptions2($(this));});
	$('#ticket_print_advanced').click(function(event) { showAdvancedOptions2($(this));});
	$('#document_print_advanced').click(function(event) { showAdvancedOptions2($(this));});
	
	
	//$('input[name=receipt_print_format]').click(function(event) { showAdvancedOptions($(this));});
	//$('input[name=ticket_print_format]').click(function(event) { showAdvancedOptions($(this));});
	//$('input[name=document_print_format]').click(function(event) { showAdvancedOptions($(this));});
	
	$('#list_serial_ports_button').click(function(event) {listSerialPorts();});
	$('#open_port_button').click(function(event) { openSerialPort();});
	$('#close_port_button').click(function(event) { closeSerialPort();});
	$('#send_data_button').click(function(event) {sendSerialData();});
	$('#list_network_info_button').click(function(event) {listNetworkInfo();});
	
	
	
	/**
	* Print functions to respond to button presses. Grab the value of the radio select and call the appropriate sample print function.
	* Sample print functions are defined in qz-sample.js
	*/
	$('#label_print_button').click(function(event){print(this,event);});
	
	$('#raw_advanced_print_button').click(function(event){print(this,event);});
	
	$('#receipt_print_button').click(function(event) {
		
		var format = $('input[name=receipt_print_format]:checked').val();
		
		console.log("Print Receipt! Format: " + format);
		
		switch(format) {
			case 'ESCP-RAW': 	printESCP(); 	break;
			case 'HTML5-PS': 	printHTML(); 	break;
		}

		event.preventDefault();
		
	});
	
	$('#ticket_print_button').click(function(event) {
		
		var format = $('input[name=ticket_print_format]:checked').val();
		
		console.log("Print Receipt! Format: " + format);
		
		switch(format) {
			case 'PGL-RAW': 	printPGL(); 	break;
			case 'HTML5-PS': 	printHTML(); 	break;
			case 'IMAGE-PS': 	printImage(); 	break;
		}

		event.preventDefault();
		
	});
	
	$('#document_print_button').click(function(event) {
		
		var format = $('input[name=document_print_format]:checked').val();
		
		console.log("Print Receipt! Format: " + format);
		
		switch(format) {
			case 'PDF-RAW': 	printPDF(); 	break;
			case 'HTML5-PS': 	printHTML(); 	break;
			case 'RTF-RAW': 	printRTF(); 	break;
			case 'IMAGE-PS': 	printImage(); 	break;
		}

		event.preventDefault();
		
	});
	
	
});

function print(caller, event) {
	alert("print function");
	alert("caller id: " + caller.id);
	// Translate label_print_button to label_print_format
	var formatName = caller.id.replace('button', 'format');
	alert("formatName: " + formatName);
	var format = $('input[name=' + formatName + ']:checked').val();
	alert("format: " + format);

	console.log("Print Label! Format: " + format);

	/* switch(format) {
	case 'EPL-RAW': 	printEPL(); 	break;
	case 'ZPL-RAW': 	printZPL(); 	break;
	case 'HTML5-PS': 	printHTML(); 	break;
	case 'IMAGE-PS': 	printImage(); 	break;
	*/ 	
	var funcName;
	if (format.indexOf('RAW') != -1) {
		// i.e. printEPL(), printZPL()
		funcName = 'print' + format.split('-')[0];
		alert('funcName: "' + funcName + '"');
	} else {
		// i.e. printLabel 
		//var docType = $(this).id.split('_')[0];
		//docType = docType.charAt(0).toUpperCase() + docType.slice(1);
		//funcName = 'print' + format.split('-')[0] + docType;
	}

	// Make sure the function has been defined
	if (eval("typeof(" + funcName + ")") == 'function') {
		eval(funcName + '();');
	} else {
		alert('Warning, "' + funcName + '" has not been defined!');
	}	
	event.preventDefault();
}

/**
* Automatically gets called when applet has loaded.
*/
function qzLoaded(success) {
	if (success) {
		// Set the progress bar to 66% / "Finding Printers" / Yellow
		$('#progressbar').progressbar({ value: 66 });
		$('.progress-label').text("Finding Printers...");
		//$('.ui-progressbar-value').css('backgroundColor', '#FF0');
		document.title = document.title + " " + qz.getVersion();
	} else {
		// Set the progress bar to 100% / "Error" / Red
		$('#progressbar').progressbar({ value: 100 });
		$('.progress-label').text("Error");
		$('.ui-progressbar-value').css('backgroundColor', '#F00');
		return false;
	}

	// set updateQueueInfo to trigger every second
	queueUpdateInterval = setInterval(updateQueueInfo, 1000);

	
	qz.findPrinter();
}

function qzDoneFinding() {
    // Get the CSV listing of attached printers
	var printers = qz.getPrinters().split(',');
	
    // Clear, and then Re-populate the printer select options
	$('#printer_select').find('option').remove();
	$('#printer_select').removeAttr('disabled');
	$('<option>').val('').text('Default Printer').data('index', -1).appendTo('#printer_select');
	for (var i in printers) {
		var sel = (qz.getPrinter() == printers[i]);
		$('<option>').val(printers[i]).text(printers[i]).data('index', i).prop('selected', sel).appendTo('#printer_select');
		if (sel) { $('#printer_select').effect("highlight", {color : "#99EB29"}); }
	}
	
	// Refresh the jQuery UI, just in case
	$('.printer_select').menu("refresh");
	
	// Set the progress bar to 100%, "Ready", "QZ-Green"
	$('#progressbar').progressbar({ value: 100 });
	$('.progress-label').text("Ready");
}

/***************************************************************************
* Sample function to demonstrate getting and displaying spool information
***************************************************************************/ 
function updateQueueInfo() {
	var queueInfo;
	
	if (qz) {
		queueJSON = qz.getQueueInfo();
		queueInfo = $.parseJSON(queueJSON);
		queueHtml = '<table id="queue_data"><thead"><tr><th>ID</th><th>State</th><th>Copies</th><th>View Job Data in Browser Console (Raw Only)</th></tr></thead><tbody>';
		
		for(var i=0; i < queueInfo.length; i++) {
			queueHtml += "<tr>";
			queueHtml += '<td class="queue_cell">' + queueInfo[i].id + "</td>";
			var jobState = queueInfo[i].state.replace("STATE_", "");
			jobState = jobState.charAt(0) + jobState.slice(1).toLowerCase();
			queueHtml += "<td>" + jobState + "</td>";
			queueHtml += "<td>" + queueInfo[i].copies + "</td>";
			queueHtml += "<td><a href='javascript:console.log(qz.getJobInfo(" + queueInfo[i].id + "))'>View Job Data</a></td>";
			queueHtml += "</tr>";
		}
		
		queueHtml += "</tbody></table>";
	
		$('#queue').html(queueHtml);
		restyleQueueInfo();
	}
	else {
		//queueInfo = "Error: Applet does not appear to be loaded!";
		queueInfo = "";
	}

}

function restyleQueueInfo() {
	$("#queue th").each(function(){$(this).addClass("ui-state-default");});
	$("#queue td").each(function(){$(this).addClass("ui-widget-content");});
	/*$("#queue-info tr").hover(function(){$(this).children("td").addClass("ui-state-hover");},function(){$(this).children("td").removeClass("ui-state-hover");});*/
	/*$("#queue-info tr").click(function(){$(this).children("td").toggleClass("ui-state-highlight");});*/
}

/***************************************************************************
* Prototype function for finding the closest match to a printer name.
* Usage:
*    qz.findPrinter('zebra');
***************************************************************************/
/*function findPrinter() {
	
	// Set to blank by default. This will search for the default printer
	var printer_name = '';
	
	// Check for optional name argument
	if(arguments[0] != null) {
		printer_name = arguments[0];
	}
	
	if (qz) {
		// Searches for locally installed printer with specified name
		qz.findPrinter(printer_name);
		var printer = qz.getPrinter();
		
		// Alert the printer name to user
		if(printer_name != '') {
			alert(printer !== null ? 'Printer found: "' + printer + 
				'" after searching for "' + printer_name + '"' : 'Printer "' + 
				printer_name + '" not found.');
		}
		else {
			alert(printer !== null ? 'Printer found: "' + printer + 
				'" after searching for the default printer.' : 'Default printer not found.');
			
			// Set the printer select box to the printer that was found
			$('#printer_select').val(printer.toString());
		}

	} else {
		// If applet is not loaded, display an error.
		return alert('Error:\n\n\tApplet is not loaded!');
	}
	
}*/