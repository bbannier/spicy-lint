# Linting rules for Spicy

This repository contains a [Spicy](https://docs.zeek.org/projects/spicy/en/latest/)
integration for [ast-grep(sg)](https://ast-grep.github.io/) and a collection of
linting rules.

## Quickstart

Building this package requires Node. To build ast-grep support for Spicy run

```console
git submodule update --init --recursive
npm install
```

With that you can run the bundled linting rules with

```console
# Check all files in directory.
./spicy-lint .

# Check given file(s).
./spicy-lint foo.spicy
```

```ruby
module foo;

type X = unit {
    : b"HELLO";
    x: uint8 { print self.x; }
};
```

```console
$ spicy-lint foo.spicy
note[print-in-prod]: print in non-debug code found
  ┌─ foo.spicy:5:16
  │
5 │     x: uint8 { print self.x; }
  │     -----------^^^^^----------
  │
  = Usually 'print' statements are used for debugging. Adding them in production
    code can introduce overhead, so it is best to either remove them, or move
    them to hooks marked '%debug'.

foo.spicy
note[use-skip]: use 'skip' for anonymous field
@@ -0,6 +0,6 @@
1 1│ module foo;
2 2│
3 3│ type X = unit {
4  │-    : b"HELLO";
  4│+    : skip  b"HELLO";
5 5│     x: uint8 { print self.x; }
6 6│ };
Note:
If a field is anonymous and not accessed via '$$' it can be declared 'skip'
so it is not stored.

foo.spicy
note[use-dd]: use $$ instead of field access
@@ -1,5 +1,5 @@
2 2│
3 3│ type X = unit {
4 4│     : b"HELLO";
5  │-    x: uint8 { print self.x; }
  5│+    x: uint8 { print $$; }
6 6│ };
Note:
Use '$$' to refer to a field in its hooks. This is more compact and requires
less changes if the field gets renamed.
```

## Advanced usage

The linter script `spicy-lint` is a thin convenience wrapper around
[ast-grep(sg)](https://ast-grep.github.io/) which sets up an enviroment to run
the linting rules in this repo, but with the Spicy integration in
`sgconfig.yml` one has access to all ast-grep(sg) features, e.g., to run queries on code with `sg run`:

```console
# To use the sg binary bundled in this package.
$ npm exec -- sg run -p 'foo' foo.spicy
foo.spicy:1:module foo;

# To use a `sg` binary from your system.
$ sg run -p 'foo' foo.spicy
foo.spicy:1:module foo;
```

See the [ast-grep(sg) tooling
documentation](https://ast-grep.github.io/guide/tooling-overview.html) for an
overview.

## Contributing

If you developed
[rules](https://ast-grep.github.io/guide/rule-config.html#rule-file) which
could be useful in general please consider opening a PR.
