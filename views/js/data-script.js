// //핸들바 템플릿 가져오기
// var source = $("#entry-template").html(); 

// //핸들바 템플릿 컴파일
// var template = Handlebars.compile(source); 



var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    retriveData();
});
//end main function

// grab data
function retriveData() {
    // var dataSource = './views/js/books.json';
    // var dataSource = '/books';
    // let dataSource = []
    // dataSource = getDataSource();
    // console.log("dataSource:" + dataSource)
    // jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
    jqueryNoConflict.getJSON(getDataSource(), renderDataVisualsTemplate);
};

// function getDataSource() {
  
//     $.getJSONuncached = function (url) {
  
//       return $.ajax(
//         {
//           url: url,
//           type: 'GET',
//           cache: false,
//           success: function (data) {
//             // $("#results").append(data);
//             // select_row();
//             return data;
//           }
//         });
//     };
  
//     $.getJSONuncached("/books");
  
// };

// // render compiled handlebars template
// function renderDataVisualsTemplate(data){
//     handlebarsDebugHelper();
//     renderHandlebarsTemplate('dataDetailsTemplate.handlebars', '#data-details', data);
// };

// // render handlebars templates via ajax
// function getTemplateAjax(path, callback) {
//     var source, template;
//     jqueryNoConflict.ajax({
//         url: path,
//         success: function (data) {
//             source = data;
//             template = Handlebars.compile(source);
//             if (callback) callback(template);
//         }
//     });
// };

// // function to compile handlebars template
// function renderHandlebarsTemplate(withTemplate,inElement,withData){
//     getTemplateAjax(withTemplate, function(template) {
//         jqueryNoConflict(inElement).html(template(withData));
//     })
// };

// // add handlebars debugger
// function handlebarsDebugHelper(){
//     Handlebars.registerHelper("debug", function(optionalValue) {
//         console.log("Current Context");
//         console.log("====================");
//         console.log(this);
//     });
// };