/**
 * Vinext's CLI calls process.exit immediately after HTTP prerendering.
 * On Windows, Node's fetch cleanup can race libuv handle teardown:
 * https://github.com/nodejs/node/issues/56645
 * Give pending cleanup a turn before the CLI's requested exit. Preserve the
 * exact exit code: this does not suppress or convert build failures.
 * Only loaded by the build command, and a no-op on other platforms.
 */
if (process.platform === 'win32') {
  const exit = process.exit.bind(process);
  let requested = false;

  process.exit = (code = process.exitCode ?? 0) => {
    if (requested) return;
    requested = true;
    process.exitCode = code;
    setTimeout(() => exit(code), 200);
  };
}
