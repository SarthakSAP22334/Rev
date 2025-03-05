sap.ui.define(
  [
    "mawai/ui5/four/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, MessageBox, MessageToast, Fragment) {
    "use strict";
    return BaseController.extend("mawai.ui5.four.controller.View2", {
      onBack: function () {
        var oCurrentView = this.getView();
        var oAppCon = oCurrentView.getParent();
        oAppCon.back(); // Go back to the previous view
      },
      onSave: function () {
        var oResourcemodel = this.getView().getModel("i18n");
        var oBundle = oResourcemodel.getResourceBundle();
        var msgSucess = oBundle.getText("msgSucess", ["858585"]);
        var msgError = oBundle.getText("msgError");
        MessageBox.confirm("Do You want to save?", {
          title: "Confirmation",
          onClose: function (status) {
            if (status === "OK") {
              MessageToast.show(msgSucess);
            } else {
              MessageBox.error(msgError);
            }
          },
        });
      },
      onCancel: function () {},
      // This is our remote control for the supplier popup
      oPopupSupplier: null,
      onFilter: function () {
        // Because we cannot access this variable as control object.
        //inside callBacks/ Promises, so we create a copy
        var that = this;
        if (!that.oPopupSupplier) {
          Fragment.load({
            name: "mawai.ui5.four.fragments.popup",
            id: "supplier",
            controller: this,
          }).then(function (oFragment) {
            // inside promise and callBack functions, we cannot access this position
            // Controller Object, so we need to create a Local variable for counting
            // Outside promises / cakkback var that=this.
            that.oPopupSupplier = oFragment;
            that.oPopupSupplier.setTitle("What are you talking About");
            // Grant the access to the fragment from the view to the Model
            that.getView().addDependent(that.oPopupSupplier);
            // Fourth Binding Syntax|| Aggregation Binding
            that.oPopupSupplier.bindAggregation("items", {
              path: "/suppliers",
              template: new sap.m.ObjectListItem({
                title: "{name}",
                intro: "{sinceWhen}",
                number: "{contactNo}",
              }),
            });
            // check SDK functions for select dialog
            that.oPopupSupplier.open();
          });
        } else {
          that.oPopupSupplier.open();
        }
        // MessageBox.alert("This functionality is under construction");
      },
      oCityPopup: null,
      onF4Help: function (oEvent) {
        this.oField = oEvent.getSource();
        var that = this;
        if (!that.oCityPopup) {
          Fragment.load({
            name: "mawai.ui5.four.fragments.popup",
            id: "city",
            controller: this,
          }).then(function (oFragment) {
            // inside promise and callBack functions, we cannot access this position
            // Controller Object, so we need to create a Local variable for counting
            // Outside promises / cakkback var that=this.
            that.oCityPopup = oFragment;
            that.oCityPopup.setTitle("What are you talking About");
            // Grant the access to the fragment from the view to the Model
            that.getView().addDependent(that.oCityPopup);
            that.oCityPopup.setMultiSelect(false);
            // Fourth Binding Syntax|| Aggregation Binding
            that.oCityPopup.bindAggregation("items", {
              path: "/cities",
              template: new sap.m.ObjectListItem({
                title: "{name}",
                intro: "{famousFor}",
                number: "{anotherName}",
              }),
            });
            // check SDK functions for select dialog
            that.oCityPopup.open();
          });
        } else {
          that.oCityPopup.open();
        }
        // MessageBox.alert("This functionality is under construction");
      },
      oField: null,
      onConfirmPopup: function (oEvent) {
        var sId = oEvent.getSource().getId();
        if (sId.indexOf("city") != -1) {
          // Get the selected item Object from event Confirm.
          var oSelectedItemObject = oEvent.getParameter("selectedItem");
          // Extract the Data From the item
          var sText = oSelectedItemObject.getTitle();
          // Set this data to the Input field
          this.oField.setValue(sText);
        }
      },
    });
  }
);

const fetchData = async () => {
  const res = await fetch(
    "https://services.odata.org/V3/(S(unylmjefzmna2idshysxdnd5))/OData/OData.svc/Products?$format=json"
  );
  const data = res.json();

  console.log(data);
};

fetchData();
const data = async () => {
  const res = await fetch("");
  const data = res.json();
  console.log(data);
};

that.oCityPopup.bindAggregation("items", {
  path: "/cities",
  template: new sap.m.ObjectListItem({
    title: "{name}",
    intro: "{famousFor}",
    number: "{anotherName}",
  }),
});
that.ocityPopup.bindAggregation("items", {
  path: "/products",
  template: new sap.m.ObjectListItem({
    title: "{name}",
    intro: "{}",
  }),
});
