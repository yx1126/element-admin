import {
    createHighlighterCoreSync,
    type CodeToHastOptions,
    type HighlighterCore,
    type LanguageRegistration,
    type MaybeArray,
    type ThemeRegistrationAny,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine-javascript.mjs";
import GithubDark from "shiki/themes/github-dark.mjs";
import GithubLight from "shiki/themes/github-light.mjs";
import VueLang from "shiki/langs/vue.mjs";
import TsLang from "shiki/langs/typescript.mjs";

let shiki: Nullable<HighlighterCore> = null;

export function useShiKi() {
    if(!shiki) {
        shiki = createHighlighterCoreSync({
            themes: [GithubDark, GithubLight],
            langs: [VueLang, TsLang],
            engine: createJavaScriptRegexEngine(),
        });
    }

    function loadTheme(...themes: MaybeArray<ThemeRegistrationAny>[]) {
        shiki?.loadThemeSync(...themes);
    }

    function loadLanguage(...langs: MaybeArray<LanguageRegistration>[]) {
        shiki?.loadLanguageSync(...langs);
    }
    function codeToHtml(code: string, options: CodeToHastOptions) {
        if(!shiki) return "";
        return shiki.codeToHtml(code, options);
    }

    return {
        shiki,
        loadTheme,
        loadLanguage,
        codeToHtml,
    };
}