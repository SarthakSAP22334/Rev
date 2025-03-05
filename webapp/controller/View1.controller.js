sap.ui.define(
  [
    "mawai/ui5/four/controller/BaseController",
    "mawai/ui5/four/util/lifesaver",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, lifesaver, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("mawai.ui5.four.controller.View1", {
      formatter: lifesaver,

      onInit: function () {
        // Initialization code here, if any
      },

      getStatus: function (status) {
        console.log("Status received:", status);
        switch (status) {
          case "Available":
            return "Success";
          case "Out of Stock":
            return "Warning";
          case "Discontinued":
            return "Error";
          default:
            return "None";
        }
      },

      onSearch: function (oEvent) {
        debugger;
        var sValue = oEvent.getSource().getValue();
        var oFilter1 = new Filter("name", FilterOperator.Contains, sValue);
        var oFilter2 = new Filter("type", FilterOperator.Contains, sValue);
        var aFilter = [oFilter1, oFilter2];
        var oFilter = new sap.ui.model.Filter({
          filters: aFilter,
          and: false,
        });
        this.getView().byId("idMyList").getBinding("items").filter(oFilter);
      },

      onItemDelete: function (oEvent) {
        var oItemToBeDeleted = oEvent.getParameter("listItem");
        console.log(oItemToBeDeleted.getTitle() + " will be deleted now");
        var oList = this.getView().byId("idMyList");
        oList.removeItem(oItemToBeDeleted);
      },

      onItemSelect: function (oEvent) {
        debugger;
        var sPath = oEvent.getParameter("listItem").getBindingContextPath();
        // var oAppCon = this.getView().getParent();
        // var oView2 = oAppCon.getPages()[1];
        // oView2.bindElement(sPath);
        // oAppCon.to(oView2.getId()); // Navigate to view2
        //Changes due t introduction of splitApp container control
        //Which has master and detail section and View2 was shifted inside detail pages Aggregation.
        var oView2 = this.getView()
          .getParent()
          .getParent()
          .getDetailPage("idView2");
        oView2.bindElement(sPath);
        this.onNext();
      },

      onNext: function () {
        var oCurrentView = this.getView();
        var oAppCon = oCurrentView.getParent();
        oAppCon.to("idView2"); // Make sure this ID is correct
      },

      onBack: function () {
        var oCurrentView = this.getView();
        var oAppCon = oCurrentView.getParent();
        oAppCon.back(); // Go back to the previous view
      },
      onItemsDelete: function () {
        var oList = this.getView().byId("idMyList");
        var aSelectedItem = oList.getSelectedItems();
        aSelectedItem.forEach((element) => {
          oList.removeItem(element);
        });
      },
    });
  }
);
