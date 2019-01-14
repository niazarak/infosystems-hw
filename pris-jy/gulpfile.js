const webpack_stream = require("webpack-stream")
const ts = require("gulp-typescript")
const gulp = require("gulp")
const del = require("del")

ts_project = ts.createProject("tsconfig.json")
gulp.task("build:server", () => {
    return ts_project.src()
        .pipe(ts_project())
        .js
        .pipe(gulp.dest("dist"))
    })

gulp.task("build:client", () => {
    return gulp.src("client/index.tsx")
        .pipe(webpack_stream(require("./webpack.config.js")))
        .pipe(gulp.dest("dist/client/static"))
})

function pack_res() {
    return gulp.src("client/public/*")
        .pipe(gulp.dest("dist/client"))
}

gulp.task("pack-res", pack_res)

gulp.task("clean", () => {
    return del(['dist/'])
})

exports.html = pack_res
exports.default = gulp.parallel(["build:server", "build:client", "pack-res"])