var FbDatabasejoin=new Class({Extends:FbElement,options:{id:0,formid:0,key:"",label:"",popwiny:0,windowwidth:360,displayType:"dropdown",popupform:0,listid:0,listRef:"",joinId:0,isJoin:false},initialize:function(b,a){this.activePopUp=false;this.activeSelect=false;this.plugin="databasejoin";this.parent(b,a);this.init()},watchAdd:function(){if(c=this.getContainer()){var a=c.getElement(".toggle-addoption");a.removeEvent("click",function(b){this.start(b)}.bind(this));a.addEvent("click",function(b){this.start(b)}.bind(this))}},start:function(i,h){h=h?true:false;var g=function(){this.close()};visible=false;if(i){i.stop();g=function(a){a.fitToContent()};visible=true;this.activePopUp=true}destroy=true;if(h===false&&(this.options.popupform===0||this.options.allowadd===false)){return}c=this.getContainer();var d=c.getElement(".toggle-addoption");var f=typeOf(d)==="null"?i.target.get("href"):d.get("href");if(typeOf(this.element)==="null"){return}var j=this.element.id+"-popupwin";this.windowopts={id:j,title:Joomla.JText._("PLG_ELEMENT_DBJOIN_ADD"),contentType:"xhr",loadMethod:"xhr",contentURL:f,height:320,y:this.options.popwiny,minimizable:false,collapsible:true,visible:visible,onContentLoaded:g,destroy:destroy};var b=this.options.windowwidth;if(b!==""){this.windowopts.width=b.toInt();this.windowopts.onContentLoaded=g}this.win=Fabrik.getWindow(this.windowopts)},getBlurEvent:function(){if(this.options.displayType==="auto-complete"){return"change"}return this.parent()},addOption:function(m,e,j){j=typeof(j)!=="undefined"?j:true;var b,f,n,k,d=[],o,h;if(m===""){}switch(this.options.displayType){case"dropdown":case"multilist":f=(m===this.options.value)?"selected":"";b=new Element("option",{value:m,selected:f}).set("text",e);document.id(this.element.id).adopt(b);break;case"auto-complete":if(j){h=this.element.getParent(".fabrikElement").getElement("input[name*=-auto-complete]");this.element.value=m;h.value=e}break;case"checkbox":n=(m===this.options.value)?true:false;d=this.element.getElements("> .fabrik_subelement");b=this.getCheckboxTmplNode().clone();var g=b.getElement("input");if(this.options.canRepeat){g.name=this.options.fullName+"["+this.options.repeatCounter+"]["+d.length+"]"}else{g.name=this.options.fullName+"["+d.length+"]"}b.getElement("span").set("text",e);b.getElement("input").set("value",m);k=d.length===0?this.element:d.getLast();o=d.length===0?"bottom":"after";b.inject(k,o);b.getElement("input").checked=n;break;case"radio":default:var a;if(this.options.canRepeat){a=this.options.fullName+"["+this.options.repeatCounter+"][]"}else{a=this.options.fullName+"[]"}n=(m===this.options.value)?true:false;b=new Element("div",{"class":"fabrik_subelement"}).adopt(new Element("label").adopt([new Element("input",{"class":"fabrikinput",type:"radio",checked:true,name:a,value:m}),new Element("span").set("text",e)]));d=this.element.getElements("> .fabrik_subelement");k=d.length===0?this.element:d.getLast();o=d.length===0?"bottom":"after";b.inject(k,o);break}},getCheckboxIDTmplNode:function(){if(!this.chxTmplIDNode&&this.options.displayType==="checkbox"){var a=this.element.getElements(".fabrikHide > .fabrik_subelement");if(a.length===0){this.chxTmplIDNode=this.element.getElement(".chxTmplIDNode").getChildren()[0].clone();this.element.getElement(".chxTmplIDNode").destroy()}else{this.chxTmplIDNode=a.getLast().clone()}}return this.chxTmplIDNode},hasSubElements:function(){var a=this.options.displayType;if(a==="checkbox"||a==="radio"){return true}return this.parent()},getCheckboxTmplNode:function(){if(!this.chxTmplNode&&this.options.displayType==="checkbox"){var a=this.element.getElements("> .fabrik_subelement");if(a.length===0){this.chxTmplNode=this.element.getElement(".chxTmplNode").getChildren()[0].clone();this.element.getElement(".chxTmplNode").destroy()}else{this.chxTmplNode=a.getLast().clone()}}return this.chxTmplNode},updateFromServer:function(a){var b={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"databasejoin",method:"ajax_getOptions",element_id:this.options.id};if(this.options.displayType==="auto-complete"&&a===""){return}if(a){b[this.strElement+"_raw"]=a;b[this.options.fullName+"_raw"]=a}new Request.JSON({url:"",method:"post",data:b,onSuccess:function(d){var e=this.getOptionValues();if(this.options.displayType==="auto-complete"&&a===""&&e.length===0){return}d.each(function(f){if(!e.contains(f.value)&&typeOf(f.value)!=="null"){if(this.activePopUp){this.options.value=f.value}this.addOption(f.value,f.text,this.activePopUp);this.element.fireEvent("change",new Event.Mock(this.element,"change"));this.element.fireEvent("blur",new Event.Mock(this.element,"blur"))}}.bind(this));this.activePopUp=false}.bind(this)}).post()},getOptionValues:function(){var b;var a=[];switch(this.options.displayType){case"dropdown":case"multilist":b=this.element.getElements("option");break;case"checkbox":b=this.element.getElements(".fabrik_subelement input[type=checkbox]");break;case"radio":default:b=this.element.getElements(".fabrik_subelement input[type=radio]");break}b.each(function(d){a.push(d.get("value"))});return a.unique()},appendInfo:function(h){var f=h.rowid;var g=this.options.formid;var e=this.options.key;var b=this.options.label;var a=Fabrik.liveSite+"index.php?option=com_fabrik&view=form&format=raw";var d={formid:this.options.popupform,rowid:f};var i=new Request.JSON({url:a,data:d,onSuccess:function(m){var k=m.data[this.options.key];var j=m.data[this.options.label];switch(this.options.displayType){case"dropdown":case"multilist":var n=this.element.getElements("option").filter(function(p,l){if(p.get("value")===k){this.options.displayType==="dropdown"?this.element.selectedIndex=l:p.selected=true;return true}}.bind(this));if(n.length===0){this.addOption(k,j)}break;case"auto-complete":this.addOption(k,j);break;case"checkbox":this.addOption(k,j);break;case"radio":default:n=this.element.getElements(".fabrik_subelement").filter(function(p,l){if(p.get("value")===k){p.checked=true;return true}}.bind(this));if(n.length===0){this.addOption(k,j)}break}if(typeOf(this.element)==="null"){return}this.element.fireEvent("change",new Event.Mock(this.element,"change"));this.element.fireEvent("blur",new Event.Mock(this.element,"blur"))}.bind(this)}).send()},watchSelect:function(){if(c=this.getContainer()){var a=c.getElement(".toggle-selectoption");if(typeOf(a)!=="null"){a.addEvent("click",function(b){this.selectRecord(b)}.bind(this));Fabrik.addEvent("fabrik.list.row.selected",function(d){if(this.options.listid.toInt()===d.listid.toInt()&&this.activeSelect){this.update(d.rowid);var b=this.element.id+"-popupwin-select";if(Fabrik.Windows[b]){Fabrik.Windows[b].close()}this.updateFromServer(d.rowid)}}.bind(this));this.unactiveFn=function(){this.activeSelect=false}.bind(this);window.addEvent("fabrik.dbjoin.unactivate",this.unactiveFn);this.selectThenAdd()}this.selectThenAdd()}},selectThenAdd:function(){Fabrik.addEvent("fabrik.block.added",function(b,a){if(a==="list_"+this.options.listid+this.options.listRef){b.form.addEvent("click:relay(.addbutton)",function(d,e){d.preventDefault();var f=this.selectRecordWindowId();Fabrik.Windows[f].close();this.start(d,true)}.bind(this))}}.bind(this))},destroy:function(){window.removeEvent("fabrik.dbjoin.unactivate",this.unactiveFn)},selectRecord:function(d){window.fireEvent("fabrik.dbjoin.unactivate");this.activeSelect=true;d.stop();var f=this.selectRecordWindowId();var b=this.getContainer().getElement("a.toggle-selectoption").href;b+="&triggerElement="+this.element.id;b+="&resetfilters=1";b+="&c="+this.options.listRef;this.windowopts={id:f,title:Joomla.JText._("PLG_ELEMENT_DBJOIN_SELECT"),contentType:"xhr",loadMethod:"xhr",evalScripts:true,contentURL:b,width:this.options.windowwidth.toInt(),height:320,y:this.options.popwiny,minimizable:false,collapsible:true,onContentLoaded:function(e){e.fitToContent()}};var a=Fabrik.getWindow(this.windowopts)},selectRecordWindowId:function(){return this.element.id+"-popupwin-select"},update:function(b){this.getElement();if(typeOf(this.element)==="null"){return}if(!this.options.editable){this.element.set("html","");if(b===""){return}b=JSON.decode(b);var a=this.form.getFormData();if(typeOf(a)==="object"){a=$H(a)}b.each(function(d){if(typeOf(a.get(d))!=="null"){this.element.innerHTML+=a.get(d)+"<br />"}else{this.element.innerHTML+=d+"<br />"}}.bind(this));return}this.setValue(b)},setValue:function(d){var b=false;if(typeOf(this.element.options)!=="null"){for(var a=0;a<this.element.options.length;a++){if(this.element.options[a].value===d){this.element.options[a].selected=true;b=true;break}}}if(!b){if(this.options.displayType==="auto-complete"){this.element.value=d;this.updateFromServer(d)}else{if(this.options.displayType==="dropdown"){if(this.options.show_please_select){this.element.options[0].selected=true}}else{this.element.getElements("input").each(function(e){if(e.get("value")===d){e.checked=true}})}}}this.options.value=d},showDesc:function(d){var b=d.target.selectedIndex;var f=this.getContainer().getElement(".dbjoin-description");var a=f.getElement(".description-"+b);f.getElements(".notice").each(function(g){if(g===a){var e=new Fx.Tween(a,{property:"opacity",duration:400,transition:Fx.Transitions.linear});e.set(0);g.setStyle("display","");e.start(0,1)}else{g.setStyle("display","none")}})},getValue:function(){var a=null;this.getElement();if(!this.options.editable){return this.options.value}if(typeOf(this.element)==="null"){return""}switch(this.options.displayType){case"dropdown":default:if(typeOf(this.element.get("value"))==="null"){return""}return this.element.get("value");case"multilist":var b=[];this.element.getElements("option").each(function(d){if(d.selected){b.push(d.value)}});return b;case"auto-complete":return this.element.value;case"radio":a="";this._getSubElements().each(function(d){if(d.checked){a=d.get("value");return a}return null});return a;case"checkbox":a=[];this.getChxLabelSubElements().each(function(d){if(d.checked){a.push(d.get("value"))}});return a}},getChxLabelSubElements:function(){var a=this._getSubElements();return a.filter(function(b){if(!b.name.contains("___id")){return true}})},getCloneName:function(){return this.options.element},getValues:function(){var a=[];var b=(this.options.displayType!=="dropdown")?"input":"option";document.id(this.element.id).getElements(b).each(function(d){a.push(d.value)});return a},cloned:function(a){this.activePopUp=false;this.parent(a);this.init();this.watchSelect();if(this.options.displayType==="auto-complete"){this.cloneAutoComplete()}},cloneAutoComplete:function(){var a=this.getAutoCompleteLabelField();a.id=this.element.id+"-auto-complete";a.name=this.element.name.replace("[]","")+"-auto-complete";document.id(a.id).value="";new FbAutocomplete(this.element.id,this.options.autoCompleteOpts)},init:function(){if(this.options.editable){this.getCheckboxTmplNode()}if(this.options.allowadd===true&&this.options.editable!==false){this.watchAdd();Fabrik.addEvent("fabrik.form.submitted",function(b,a){if(this.options.popupform===b.id){if(this.options.displayType==="auto-complete"){var d=new Request.JSON({url:Fabrik.liveSite+"index.php?option=com_fabrik&view=form&format=raw",data:{formid:this.options.popupform,rowid:a.rowid},onSuccess:function(e){this.updateFromServer(e.data[this.options.key])}.bind(this)}).send()}else{this.updateFromServer()}}}.bind(this))}if(this.options.editable){this.watchSelect();if(this.options.showDesc===true){this.element.addEvent("change",function(a){this.showDesc(a)}.bind(this))}this.watchJoinCheckboxes()}},watchJoinCheckboxes:function(){},getAutoCompleteLabelField:function(){var b=this.element.getParent(".fabrikElement");var a=b.getElement("input[name*=-auto-complete]");if(typeOf(a)==="null"){a=b.getElement("input[id*=-auto-complete]")}return a},addNewEventAux:function(action,js){switch(this.options.displayType){case"dropdown":default:if(this.element){this.element.addEvent(action,function(e){e.stop();(typeOf(js)==="function")?js.delay(0,this,this):eval(js)}.bind(this))}break;case"radio":this._getSubElements();this.subElements.each(function(el){el.addEvent(action,function(e){(typeOf(js)==="function")?js.delay(0,this,this):eval(js)}.bind(this))}.bind(this));break;case"auto-complete":var f=this.getAutoCompleteLabelField();if(typeOf(f)!=="null"){f.addEvent(action,function(e){e.stop();(typeOf(js)==="function")?js.delay(700,this,this):eval(js)}.bind(this))}break}},decreaseName:function(b){if(this.options.displayType==="auto-complete"){var a=this.getAutoCompleteLabelField();if(typeOf(a)!=="null"){a.name=this._decreaseName(a.name,b,"-auto-complete");a.id=this._decreaseId(a.id,b,"-auto-complete")}}return this.parent(b)}});