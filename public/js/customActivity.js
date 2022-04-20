define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    // connection.on('requestedInteraction', onRequestedInteraction);
    // connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
    // connection.on('requestedDataSources', onRequestedDataSources);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        // connection.trigger('requestInteraction');
        // connection.trigger('requestTriggerEventDefinition');
        // connection.trigger('requestDataSources');  

    }

    function onRequestedDataSources(dataSources){
        console.log('*** requestedDataSources ***');
        console.log(dataSources);
    }

    function onRequestedInteraction (interaction) {    
        console.log('*** requestedInteraction ***');
        console.log(interaction);
     }

     function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        console.log('*** requestedTriggerEventDefinition ***');
        console.log(eventDefinitionModel);
    }

    function initialize(data) {
        console.log("dataArguments-->",data.arguments);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log("inArguments---->",inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        // var postcardURLValue = $('#postcard-url').val();
        // var postcardTextValue = $('#postcard-text').val();
        console.log("payloadAntes-->",payload['arguments'].execute.inArguments);
        console.log("payloadAntes--> con Promocion",payload['arguments'].execute.inArguments[0].Promocion);
        console.log("payloadAntes--> con Phone",payload['arguments'].execute.inArguments[1].Phone);
        console.log("payloadAntes--> con Nombre",payload['arguments'].execute.inArguments[2].Nombre);
        //payload['arguments'].execute.inArguments = [{
        //    "tokens": authTokens
        //}];
        
        payload['arguments'].execute.inArguments = [{
            'Promocion': "{{Contact.Key}}"
        },
        {
            'Phone': "{{Contact.Attribute.Master_de_clientes_Krispy_Kreme.DXPHONENUMBER}}"
        },
        {
            'Nombre': "{{InteractionDefaults.MobileNumber}}"
        }];


        payload['metaData'].isConfigured = true;

        console.log("payloadDespues-->",payload['arguments'].execute.inArguments);
        connection.trigger('updateActivity', payload);
        console.log("termino save")
    }


});
