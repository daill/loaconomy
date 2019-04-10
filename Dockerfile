FROM golang:1.12 as builder
RUN mkdir /build
ADD . /build/
WORKDIR /build
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o server *.go
FROM scratch
COPY --from=builder /build/server /build/conf.json /build/public /app/
COPY --from=builder /build/public /app/public
WORKDIR /app
EXPOSE 8890:8890
CMD ["./server"]
