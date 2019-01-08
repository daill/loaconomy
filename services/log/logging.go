package log

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"gitlab.daill.de/loaconomy/services/utils"
	"os"
)

var dbLogger *logrus.Logger = nil
var fileLogger *logrus.Logger = nil

const (
	LOGIFLE_NAME 	= "loaconomy.log"
)

func openLogfile() (*os.File, error) {
	file, err := os.OpenFile(LOGIFLE_NAME, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	return file, err
}

func configureFileLogger(file *os.File, level logrus.Level) {
	fileLogger = logrus.New()
	fileLogger.SetOutput(file)
	fileLogger.SetFormatter(&logrus.TextFormatter{})
	fileLogger.SetLevel(level)
}

func configureStdLogger(level logrus.Level) {
	logrus.SetFormatter(&logrus.TextFormatter{})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(level)
}

func configureDBLogger() {

}

func initTestLogging() {
	level := logrus.InfoLevel

	file, err := openLogfile()
	if err != nil {
		fmt.Printf("could not open logfile: %s", err)
	}

	configureFileLogger(file, level)
	configureStdLogger(level)
}

func initDevelopmentLogging() {
	level := logrus.DebugLevel

	file, err := openLogfile()
	if err != nil {
		fmt.Printf("could not open logfile: %s", err)
	}

	configureFileLogger(file, level)
	configureStdLogger(level)
}

func initProdLogging() {
	level := logrus.InfoLevel

	file, err := openLogfile()
	if err != nil {
		fmt.Printf("could not open logfile: %s", err)
	}

	configureFileLogger(file, level)
	configureStdLogger(level)
}

func InitLogging(environment string) {
	switch environment {
	case utils.DevelopmentEnv:
		initDevelopmentLogging()
	case utils.TestEnv:
		initTestLogging()
	case utils.ProductionEnv:
		initProdLogging()
	}
	logrus.Debugf("Environment: %s", environment)
}

func Debug(msg string) {
	if dbLogger != nil {
		dbLogger.Debug(msg)
	}
	if fileLogger != nil {
		fileLogger.Debug(msg)
	}
	logrus.Debug(msg)
}

func Debugf(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Debugf(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Debugf(msg, args...)
	}
	logrus.Debugf(msg, args...)
}

func Info(msg string) {
	if dbLogger != nil {
		dbLogger.Info(msg)
	}
	if fileLogger != nil {
		fileLogger.Info(msg)
	}
	logrus.Info(msg)
}

func Infof(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Infof(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Infof(msg, args...)
	}
	logrus.Infof(msg, args...)
}

func Warn(msg string) {
	if dbLogger != nil {
		dbLogger.Warn(msg)
	}
	if fileLogger != nil {
		fileLogger.Warn(msg)
	}
	logrus.Warn(msg)
}

func Warnf(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Warnf(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Warnf(msg, args...)
	}
	logrus.Warnf(msg, args...)
}

func Error(msg string) {
	if dbLogger != nil {
		dbLogger.Error(msg)
	}
	if fileLogger != nil {
		fileLogger.Error(msg)
	}
	logrus.Error(msg)
}

func Errorf(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Errorf(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Errorf(msg, args...)
	}
	logrus.Errorf(msg, args...)
}

func Fatal(msg string) {
	if dbLogger != nil {
		dbLogger.Fatal(msg)
	}
	if fileLogger != nil {
		fileLogger.Fatal(msg)
	}
	logrus.Fatal(msg)
}

func Fatalf(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Fatalf(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Fatalf(msg, args...)
	}
	logrus.Fatalf(msg, args...)
}

func Panic(msg string) {
	if dbLogger != nil {
		dbLogger.Panic(msg)
	}
	if fileLogger != nil {
		fileLogger.Panic(msg)
	}
	logrus.Panic(msg)
}

func Panicf(msg string, args ...interface{}) {
	if dbLogger != nil {
		dbLogger.Panicf(msg, args...)
	}
	if fileLogger != nil {
		fileLogger.Panicf(msg, args...)
	}
	logrus.Panicf(msg, args...)
}
