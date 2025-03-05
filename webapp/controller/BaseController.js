sap.ui.define(
  ["sap/ui/core/mvc/Controller", "mawai/ui5/four/util/lifesaver"],
  function (Controller, lifesaver) {
    "use strict";
    return Controller.extend("mawai.ui5.four.controller.BaseController", {
      formatter: lifesaver,
    });
  }
);
