import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest, baseBuildOptions } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            scripts: ["src/background.ts"],
          },
          // @ts-ignore
          browser_specific_settings: {
            gecko: {
              id: "swim2garmin@gabrieldonadel.dev",
              strict_min_version: "58.0",
            },
          },
        } as ManifestV3Export,
        browser: "firefox",
        contentScripts: {
          injectCss: true,
        },
      }),
    ],
    build: {
      ...baseBuildOptions,
      outDir,
    },
    publicDir: resolve(__dirname, "public"),
  })
);
