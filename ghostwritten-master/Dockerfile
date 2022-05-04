
FROM aegooby/turtle:latest AS ghostwritten

# Dokku
EXPOSE 3080

WORKDIR /root/ghostwritten
COPY . /root/ghostwritten
RUN cli/install.sh
RUN turtle upgrade
RUN turtle cache

FROM ghostwritten AS localhost

RUN turtle clean --dist
RUN turtle bundle:snowpack --url http://localhost/
RUN cargo build --release
RUN mv target/release/turtle target/
RUN rm -rf .cache target/release
CMD [ "target/turtle" ]

FROM ghostwritten AS dev

RUN turtle clean --dist
RUN turtle bundle:snowpack --url https://www.dev.ghostwritten.io/
RUN cargo build --release
RUN mv target/release/turtle target/
RUN rm -rf .cache target/release
CMD [ "target/turtle" ]

FROM ghostwritten AS live

RUN turtle clean --dist
RUN turtle bundle:snowpack --url https://www.ghostwritten.io/
RUN cargo build --release
RUN mv target/release/turtle target/
RUN rm -rf .cache target/release
CMD [ "target/turtle" ]
