# Schema.js

[Schema.js](https://shreddr.captricity.com/static/backbone/schema.js) is a Captricity hosted Javascript that provides access to the Captricity API.

Schema.js uses [Backbone.js](http://backbonejs.org/), a small library which wraps web APIs and allows front end developers to avoid rewriting all of the usual fetching, saving, and UI listening code which almost every modern web application uses.

In this example code, you will use schema.js to fetch a collection of Job resources and list them in an HTML list.  The order of events which occur to make this happen are as follows:

1. Load all of the required scripts
1. Use captricity.APISchema instance to fetch the [schema document](https://shreddr.captricity.com/api/backbone/schema)
1. When the schema is loaded, create a captricity.api.Jobs instance and ask it to fetch a list of your jobs
1. When the list of jobs arrives, render them to the page

## Follow along at home

The code for this example is [in the js_example GitHub repo](https://github.com/Captricity/js_example) and can be pulled with git or downloaded using GitHub's handy download link.

The file which we will going through in this document is [index.html](https://github.com/Captricity/js_example/blob/master/index.html).

## Set your API Token

This example hard codes a user's api token into the page but in your application you'll need to go through the access request process in order to associate your application with a user's Captricity account.

Here's how you define the API token so that the schema.js code can use it:

	captricity.apiToken = 'A USER TOKEN GOES HERE';

## Load the required scripts

These tags will load jQuery, underscore, json2, and backbone scripts, all of which are required to use schema.js.

    &lt;script src="jquery.1.7.2.js">&lt;/script>
    &lt;script src="underscore-min.js">&lt;/script>
    &lt;script src="json/json2.js">&lt;/script>
    &lt;script src="backbone-min.js">&lt;/script>

    &lt;script src="https://shreddr.captricity.com/static/backbone/schema.js">&lt;/script>

## Use captricity.APISchema instance to fetch the [schema document](https://shreddr.captricity.com/api/backbone/schema)

Set a variable which defines the URL where the schema document is located:

	captricity.endpointURL = 'https://shreddr.captricity.com/api/backbone/schema';

The captricity.APISchema class extends the Backbone.js Model class and can fetch the API schema from Captricity.  So, let's make one!

    window.schema = new captricity.APISchema();

Now let's define a function which will be called after the APISchema class has fetched the schema and used it to generate the rest of the API classes.

    function handleSchemaReady(){
        console.log("The schema has been fetched and used to populate captricity.api.*");
    }

Now we're ready to actually fetch the schema, but let's be sure that the entire document is loaded by using the jQuery `ready` function.

    $(document).ready(function(){
        window.schema.fetch({ success: handleSchemaReady });
    });

## When the schema is loaded, create a captricity.api.Jobs instance and ask it to fetch a list of your jobs

Now that we understand how to fetch the schema, let's change the previously (kind of useless) handleSchemaReady function to ask the newly created API classes to load a list of job resources:

    function handleSchemaReady(){
        window.jobs = new captricity.api.Jobs();
        window.jobs.fetch({ success: handleJobsList });
    }

Now when the schema has been fetched and parsed the handleJobsList function (defined below) will be called.

## When the list of jobs arrives, render them to the page

See that handleJobsList function that was passed into the window.jobs.fetch call?  That's what will be called when the list of jobs has arrived and is ready for use.  So, let's use that list to render a list to HTML:

    function handleJobsList(){
        for(var i=0; i < window.jobs.length; i++){
            $('#jobs-list').append($('<li />').text(window.jobs.at(i).get('name')));
        }
    }

## Last words

Now that you've seen schema.js in action, you should be able to use the model and collection in captricity.api to access all of the resources listed on the [API reference](https://shreddr.captricity.com/developer/api-reference/).