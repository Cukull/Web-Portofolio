import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as renderComponent, l as renderTemplate } from "./server_BQAe3B-h.mjs";
import { t as createComponent } from "./compiler_DO-b9psp.mjs";
import { t as keystatic_config_default } from "./keystatic.config_Cyv121ge.mjs";
import "react";
import { Keystatic } from "@keystatic/core/ui";
import { jsx } from "react/jsx-runtime";
//#region node_modules/@keystatic/astro/dist/keystatic-astro-ui.js
var appSlug = {
	envName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
	value: void 0
};
function makePage(config) {
	return function Keystatic$1() {
		return /* @__PURE__ */ jsx(Keystatic, {
			config,
			appSlug
		});
	};
}
//#endregion
//#region src/pages/keystatic/[...params].astro
var ____params__exports = /* @__PURE__ */ __exportAll({
	all: () => all,
	default: () => $$Component,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var all = makePage(keystatic_config_default);
var $$Component = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "all.Keystatic", all.Keystatic, {})}`;
}, "D:/IT/Belajar Coding/Web Portofolio/src/pages/keystatic/[...params].astro", void 0);
var $$file = "D:/IT/Belajar Coding/Web Portofolio/src/pages/keystatic/[...params].astro";
var $$url = "/keystatic/[...params]";
//#endregion
//#region \0virtual:astro:page:src/pages/keystatic/[...params]@_@astro
var page = () => ____params__exports;
//#endregion
export { page };
