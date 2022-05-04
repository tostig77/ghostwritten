
import { CLI, yargs } from "../deps.ts";

Deno.env.set("DENO_DIR", ".cache/");
const [args, _] = [Deno.args, "turtle"];
if (import.meta.main) {
    yargs.default(args)
        .help(false)
        .command("*", "", {}, CLI.all())
        .command("clean", "", {}, CLI.clean())
        .command("cache", "", {}, CLI.cache())
        .command("bundle", "", {}, CLI.bundle())
        .command("bundle:help", "", {}, CLI.bundle())
        .command("bundle:relay", "", {}, CLI.bundleRelay())
        .command("bundle:snowpack", "", {}, CLI.bundleSnowpack())
        .command("run", "", {}, CLI.run())
        .command("run:help", "", {}, CLI.run())
        .command("run:local", "", {}, CLI.runLocal())
        .command("run:deploy", "", {}, CLI.runDeploy())
        .command("test", "", {}, CLI.test())
        .command("help", "", {}, CLI.help())
        .parse();
}