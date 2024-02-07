sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        var that;

        return Controller.extend("sample.controller.View", {
            onInit: function () {
    
                that = this;

                this.getView().setModel(new JSONModel(), "viewModel");

            },

            onAfterRendering: function () {

                var oModel = this.getView().getModel();

                oModel.read("/F4_COMPANYSet",{
                    success : function(data){
                        
                        var aData = [];

                        data.results.forEach(function(item,i){
                            var oData = {
                                code:item.RCOMP,
                                name:item.NAME1,
                            };
                            
                            aData.push(oData);
                        })

                        that.getView().getModel("viewModel").setProperty("/company", aData);

                        console.log("success!!!");
                    },
                    error : function(data){
                        console.log("error!!!");
                        that.getView().getModel("viewModel").setProperty("/company", []);
                    }
                });

            }
        });
    });