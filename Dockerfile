FROM ghcr.io/sourcemeta/one:7.1

COPY one.json .
COPY draft-07/schemas schemas/schemas
COPY draft-07/bindings schemas/bindings
COPY draft-07/examples schemas/examples

RUN sourcemeta one.json
