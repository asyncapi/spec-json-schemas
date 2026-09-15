FROM ghcr.io/sourcemeta/one:7.1

COPY one.json .
COPY draft-07/bindings     schemas/draft-07/bindings
COPY draft-07/integrations schemas/draft-07/integrations
COPY draft-07/schemas      schemas/draft-07/schemas

RUN sourcemeta one.json

RUN groupadd --system app \
 && useradd --system --gid app --create-home --shell /usr/sbin/nologin app \
 && chown -R app:app /sourcemeta

USER app