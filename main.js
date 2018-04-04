"use strict";

/*
        Customizer For 'Index Of' pages by
           _____                       _
          / ____|                     | |
         | (___  _ __   __ _  ___  ___| |      ___ _ __   ___  _ __ ___
          \___ \| '_ \ / _` |/ __|/ _ \ |     / _ \ '_ \ / _ \| '__/ _ \
          ____) | |_) | (_| | (__|  __/ |____|  __/ | | | (_) | | |  __/
         |_____/| .__/ \__,_|\___|\___|______|\___|_| |_|\___/|_|  \___|
                | |
                |_|
    Get this at:
    https://github.com/SpaceLenore/IndexOf-Customizer
        @SpaceLenore
        2018-04-04

        Copyright 2018 SpaceLenore

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0
*/

(function() {
    //Define base elements
    window.rootElement = document.getElementById("root");
    window.mainContainer = document.createElement("main");
    window.mainContainer.className = "container";

    var api = config.apiEndpoint;
    var inpoint = "/" + location.pathname.substring(1);

    getData(inpoint);

    window.addEventListener("popstate", function () {
        inpoint = "/" + location.pathname.substring(1);
        getData(inpoint);
    });

    function getData(datain) {
        fetch(api + datain)
            .then(function (response) {
                return response.json();
            }).then(function(datain) {
                console.log("Done Loading!");
                window.mainContainer.innerHTML = "";

                if (inpoint != "/") {
                    var backbt = document.createElement("button");
                    backbt.className = "backbt";
                    backbt.textContent = "< Back";
                    backbt.addEventListener("click", function () {
                        history.back();
                    });
                    window.mainContainer.appendChild(backbt);
                }


                datain.forEach(function(content) {
                    var linkbox = document.createElement("div");
                    var pathname = content.name;

                    linkbox.className = "linkbox";

                    //add / to end of dirs to make it easier
                    if (content.type == "directory") {
                        linkbox.innerHTML += "<i class='material-icons'>folder_open</i><a>" +
                        content.name + "/</a>";
                    } else {
                        linkbox.innerHTML += "<i class='material-icons'>insert_drive_file</i><a href='" +
                        api + inpoint + content.name + "'>" + content.name +
                        "</has>";
                    }

                    linkbox.addEventListener("click", function () {
                        console.log(this.childNodes[1].textContent);
                        //alert(inpoint);
                        if (this.childNodes[1].textContent.endsWith("/")) {
                            inpoint += this.childNodes[1].textContent;
                            console.log("Loading " + inpoint + "...");
                            history.pushState(inpoint, "this is a state", inpoint);
                            getData(inpoint);
                        } else {
                            window.location = api + inpoint + this.childNodes[1].textContent;
                        }
                    });

                    window.mainContainer.appendChild(linkbox);
                });


                rootElement.appendChild(mainContainer);
            }).catch(function(error) {
                console.log('The fetch operation failed' +
                'due to the following error: ', error.message);
                window.rootElement.innerHTML = "<h2>An error has occured</h2>";
            });
    }
})();
