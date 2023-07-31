# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.2]

## [1.3.1]
- Bump dependencies

## [1.3.0]
- TypeScript 5.0 upgrade
- Bump dependencies

## [1.2.0]
- Disables "Show battery" by default
- Improve performance of battery status updates if "Show battery" is enabled by caching if battery is available ([#2](https://github.com/alexkainzinger/resource-watchdog/issues/2))
- Bump dependencies

## [1.1.1]
- Slight performance improvements by checking if certain stats are enabled before deciding if it can be shown (by requesting it from the system), e.g. Battery, CPU Temperature & Disk
- Bump dependencies, notable: `systeminformation` to resolve typing issue

## [1.1.0]
- Renamed `resourceWatchdog.color` to `resourceWatchdog.colorOverride` to better support light themes ([#1](https://github.com/alexkainzinger/resource-watchdog/issues/1))
- Improve galleryBanner color for VSCode Marketplace

## [1.0.0] - Initial Version 🎉

- Support for:
  - Battery Percentage
  - CPU Frequency (with certain limits)
  - CPU Temperature (with certain limits)
  - CPU Usage
  - Disk Stats
  - Memory Usage
  - Network Stats (received and transferred byte/seconds)
  - Swap Usage
  - Uptime