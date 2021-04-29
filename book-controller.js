/** refs
 * https://stackoverflow.com/questions/43256505/replacing-fs-readfile-with-fs-createreadstream-in-node-js
 * https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
 * https://stackoverflow.com/questions/51841742/node-server-not-returning-any-response-after-api-request
 * https://stackoverflow.com/questions/52122677/how-to-refresh-form-page-after-post-request
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
 * https://dev.to/moz5691/nodejs-and-ajax-4jb5
 */
const Book = require('./models/book'),
  fs = require('fs'),
  Handlebars = require("handlebars");




  //https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
  //If using mongoose, this issue can be solved by using .lean() to get a json object (instead of a mongoose one):

  // dbName.find({}).lean()
  //   // execute query
  //   .exec(function(error, body) {
  //      //Some code
  //   });

//get books
exports.getBooks = function (req, res) {
  // Book.find({}, function (err, books) {
  Book.find({}).lean().exec(function(err, books) {
    if (err) {
      res.status(400).json(err);
    }

    // console.log(__dirname)
    let readStream = fs.createReadStream(__dirname + '/views/index.html')

    // When the stream is done being read, end the response
    readStream.on('close', () => {
      res.end()
    })

    

    // let result = returnResult(books);
    // var result = template(returnResult(books));
    // var data = JSON.stringify(books, null, 2)
    // var data = books;
    // var result = template(data);

    // Handlebars.registerHelper('name', function(name){
    //   return name + "@naver.com";
    // });



    var source = fs.readFileSync('./views/js/dataDetailsTemplate.handlebars', 'utf8');
    var template = Handlebars.compile(source);
    // var data = books;
    // var result = template(JSON.stringify(books, null, 2));
    // var result = template(books);
    // let result = returnResult(books);
    // res.send(result)
    // readStream.pipe(res.end(template(result).toString())) // Stream chunks to response

    console.log(books)

    // https://github.com/helpers/handlebars-helpers#eq
    Handlebars.registerHelper("if", function(a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
    });
    readStream.pipe(res.end(template(books).toString())) // Stream chunks to response

    // readStream.pipe(res.end(books.toString())) // Stream chunks to response

    /************************
     * default res
    // res.json(books);
    ************************/

  });
};

//function to categorize books OBJ by section and return a xml converted. 
function returnResult(books) {

  let FICTION = [],
    SF = [],
    IT = [];

  for (let i = 0; i < books.length; i++) {
    if (books[i]['name'] == "FICTION") {
      // console.log(books[i])
      FICTION.push(books[i])
    }
    if (books[i]['name'] == "SF") {
      // console.log(books[i])
      SF.push(books[i])
    }
    if (books[i]['name'] == "IT") {
      // console.log(books[i])
      IT.push(books[i])
    }
  }

  
  /**
   * DO JSON.stringify for each of the array OBJs.
   * this step is pretty much important to get necessary fields only in json docs each,
   * in the sense that the npm module 'xml-js' does xml <-> json convert,
   * but returns native values with full details.
   */
  let f = { "FICTION": FICTION};
  // let f = { "FICTION": JSON.stringify(FICTION)};
  let sf = JSON.stringify(SF, null, 2);
  let it = JSON.stringify(IT, null, 2);
  // let toReturn = toXml(f, sf, it);

  // console.log(f)

  // console.log(f)
  
  //  // let result = toJson(books);
  //   // var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
  //   //   "{{kids.length}} kids:</p>" +
  //   //   "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
  //   var source = fs.readFileSync('./views/js/dataDetailsTemplate.handlebars', 'utf8');
  //   var template = Handlebars.compile(source);

  //   // var data = {
  //   //   "name": "Alan", "hometown": "Somewhere, TX",
  //   //   "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
  //   // };

  //   // var data = { "objects": [{ "Source": "National Employment Law Project", "DataOrder": "1", "SourceLink": "http://www.nelp.org/", "Data": "12.29.2012", "Title": "The last day anyone will receive benefits from the Emergency Unemployment Compensation program unless Congress acts to renew it." }, { "Source": "Congressional Budget Office", "DataOrder": "2", "SourceLink": "", "Data": "$30,000,000,000", "Title": "Estimated cost to renew the Emergency Unemployment Compensation program through the end of 2013." }, { "Source": "National Employment Law Project", "DataOrder": "3", "SourceLink": "http://www.nelp.org/", "Data": "400,000", "Title": "Estimated number of Californians receiving benefits from the Emergency Unemployment Compensation program, which is set to expire Jan. 2." }, { "Source": "National Employment Law Project", "DataOrder": "4", "SourceLink": "http://www.nelp.org/", "Data": "2,100,000", "Title": "Estimated number of Americans receiving benefits under the Emergency Unemployment Compensation program that would lose their unemployment benefits come January if Congress doesn’t act." }, { "Source": "National Employment Law Project", "DataOrder": "5", "SourceLink": "http://www.nelp.org/", "Data": "940,000", "Title": "Estimated number of Americans whose state unemployment benefits will end in the first quarter of 2013, and would be eligible for benefits under the Emergency Unemployment Compensation program." }, { "Source": "National Employment Law Project", "DataOrder": "6", "SourceLink": "http://www.nelp.org/", "Data": "February 2012", "Title": "The date when the Emergency Unemployment Compensation program was last renewed by Congress." }, { "Source": "U.S. Department of Labor", "DataOrder": "7", "SourceLink": "http://www.ows.doleta.gov/unemploy/supp_act.asp", "Data": "June 30, 2008", "Title": "The date the Emergency Unemployment Compensation program was created." }, { "Source": "National Employment Law Project", "DataOrder": "8", "SourceLink": "http://www.nelp.org/", "Data": "10", "Title": "The number of times Congress has renewed the Emergency Unemployment Compensation program since it was first created in the summer of 2008." }, { "Source": "National Employment Law Project", "DataOrder": "9", "SourceLink": "http://www.nelp.org/", "Data": "37 percent", "Title": "Estimated percent of Californians that have been unemployed more than a year since 2008, when the Emergency Unemployment Compensation program was created to help the long-term unemployed." }, { "Source": "National Employment Law Project", "DataOrder": "10", "SourceLink": "http://www.nelp.org/", "Data": "5,000,000", "Title": "Estimated number of Americans that have been without work for six months or longer" }, { "Source": "U.S. Department of Labor", "DataOrder": "11", "SourceLink": "http://workforcesecurity.doleta.gov/unemploy/docs/potential_weeks_map.pdf", "Data": "26 weeks", "Title": "Cap on unemployment benefits by the least generous states." }, { "Source": "National Employment Law Project", "DataOrder": "12", "SourceLink": "http://www.nelp.org/", "Data": "14 to 47 weeks", "Title": "The range of maximum benefits states offer, subsidized by the Emergency Unemployment Compensation program." }, { "Source": "U.S. Department of Labor", "DataOrder": "13", "SourceLink": "http://workforcesecurity.doleta.gov/unemploy/docs/potential_weeks_map.pdf", "Data": "73 weeks", "Title": "Maximum length of benefits for new claimants in California under the Emergency Unemployment Compensation program." }, { "Source": "Center on Budget & Policy Priorities", "DataOrder": "14", "SourceLink": "http://www.cbpp.org/cms/index.cfm?fa=view&id=3164", "Data": "Nine states", "Title": "Number of states with unemployment rates above 9 percent in which workers are eligible for up to 47 weeks of additional benefits under the Emergency Unemployment Compensation program." }, { "Source": "U.S. Department of Labor", "DataOrder": "15", "SourceLink": "http://www.nelp.org/", "Data": "$40,000,000,000", "Title": "Estimated amount of money brought into the state of California by those receiving benefits from the Emergency Unemployment Compensation program since it began in July 2008." }] }
  //   // var data = { "objects": books };
  //   // var data = books;
  //   // var data = JSON.stringify(books, null, 2)
  //   // console.log(books)


    // var result = template( JSON.stringify(f, null, 2));
  //   // console.log(result)

  return f;

}

//may need to do await async
//function to convert json to xml
function toJson(books) {

  //write to a file in xml format
  // fs.writeFileSync('./views/js/books.json', JSON.stringify(books, null, 2));
  // let json = fs.readFileSync('./views/js/books.json', 'utf8'); //read the xml written

  // let dateSource = JSON.stringify(books, null, 2)
  let template = fs.readFileSync('./views/js/dataDetailsTemplate.handlebars', 'utf8');


  // // var xsl = fs.readFileSync('./xmlxsl/Books.xsl', 'utf8'); //read pre-defined xsl
  // // var doc = xmlParse(xml); //Parsing our XML file
  // // var stylesheet = xmlParse(xsl); //Parsing our XSL file
  // // return xsltProcess(doc, stylesheet); //return XSL Transformation
  return json;

}

// //may need to do await async
// //function to convert json to xml
// function toXml(f, sf, it) {

//   //prepare to write to a file in xml format
//   //it is where the npm module 'xml-js' is used
//   var options = { compact: true, ignoreComment: true, spaces: 6 };
//   var xmlHead = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\n<books>\n';
//   var xmlend = '\n</books>';
//   var result = xmlHead +
//     "<placeholder0>\n" + convert.json2xml(f, options) + "\n</placeholder0>" +
//     "\n<placeholder1>\n" + convert.json2xml(sf, options) + "\n</placeholder1>" +
//     "\n<placeholder2>\n" + convert.json2xml(it, options) + "\n</placeholder2>" +
//     xmlend;

//   //refine all to be in xml format properly as needed
//   var regx1 = new RegExp("<[0-9]*>", "gm"),
//     regx2 = new RegExp("</[0-9]*>", "gm"),
//     regx3 = new RegExp("^<placeholder0>$", "gm"),
//     regx4 = new RegExp("^</placeholder0>$", "gm"),
//     regx5 = new RegExp("^<placeholder1>$", "gm"),
//     regx6 = new RegExp("^</placeholder1>$", "gm"),
//     regx7 = new RegExp("^<placeholder2>$", "gm"),
//     regx8 = new RegExp("^</placeholder2>$", "gm");

//   result = result.replace(regx1, '    <entree>')
//   result = result.replace(regx2, '    </entree>')
//   result = result.replace(regx3, ' <section name="Fiction">')
//   result = result.replace(regx4, ' </section>')
//   result = result.replace(regx5, ' <section name="SF">')
//   result = result.replace(regx6, ' </section>')
//   result = result.replace(regx7, ' <section name="IT">')
//   result = result.replace(regx8, ' </section>')

//   //write to a file in xml format
//   fs.writeFileSync('./xmlxsl/Books.xml', result);
//   var xml = fs.readFileSync('./xmlxsl/Books.xml', 'utf8'); //read the xml written
//   var xsl = fs.readFileSync('./xmlxsl/Books.xsl', 'utf8'); //read pre-defined xsl
//   var doc = xmlParse(xml); //Parsing our XML file
//   var stylesheet = xmlParse(xsl); //Parsing our XSL file
//   return xsltProcess(doc, stylesheet); //return XSL Transformation

// }

//post books or a book
exports.createBook = function (req, res) {
  if (req.body.batch) {

    //can be used when necessary to insert many docs into db in postman only
    Book.insertMany(req.body.batch, function (err) {
      if (err)
        res.status(400).json(err);
      else
        res.json(req.body);
    });

  } else {
    // a single doc insertion
    var newbook = new Book(req.body);
    // console.log("newbook: " + newbook)

    newbook.save(function (err, book) {
      if (err) {
        res.status(400).json(err);
      }

      console.log("\nPOST the following book:\n" + book)
      res.redirect('/')  //res.redirect('back')

    });
  }
};

//update a book
exports.updateBook = function (req, res) {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, book) {

    if (err) {
      res.status(400).json(err);
    }
    //res.json(book);
    console.log("\nPUT the following book:\n" + book)
    res.redirect('/')  //res.redirect('back')
  });
};

//delete a book
exports.deleteBook = function (req, res) {

  Book.findByIdAndRemove(req.params.id, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    // res.json(book);
    console.log("\nDELETED the following book:\n" + book)
    res.redirect('/')  //res.redirect('back')
  });

};

//not in use for front-end
//not designed to interact with front-end directly 
//but it can be used when needing to GET a doc in the postman
exports.getBook = function (req, res) {
  Book.findOne({ _id: req.params.id }, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    //res.json(book);
    console.log(book)
    res.redirect('/')  //res.redirect('back')
  });
};

//not in use for front-end
//not designed to interact with front-end directly 
//but it can be used when needing to deleting a bacth in the postman
exports.deleteBooks = function (req, res) {
  Book.deleteMany({}, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    res.json(book);
  });
};
