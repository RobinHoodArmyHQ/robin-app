# syntax=docker/dockerfile:1

# Use an official Ubuntu as a parent image
FROM ubuntu:24.04

# Set the working directory
WORKDIR /app

# Define constants and parameters
ARG NODE_VERSION="20"
ARG ANDROID_CMDLINE_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
ARG ANDROID_SDK_VERSION="34"

# Install required dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg wget unzip git vim-common telnet screen lsof && \
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y openjdk-17-jdk && \
	apt-get install -y watchman && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install TypeScript
RUN npm install -g typescript pnpm

# Install Android Commandline Tools
RUN wget ${ANDROID_CMDLINE_TOOLS_URL} -O android_cmdline_tools.zip && \
	unzip android_cmdline_tools.zip && \
	mkdir -p /root/android_sdk/cmdline-tools/latest && \
	mv cmdline-tools/* /root/android_sdk/cmdline-tools/latest/ && \
	rm -rf cmdline-tools android_cmdline_tools.zip

# Define Android Environment Variables
ENV ANDROID_HOME="/root/android_sdk"
ENV PATH="${PATH}:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${ANDROID_HOME}/cmdline-tools/latest/bin"

# Setup Android SDK and Platform Tools using sdkmanager
RUN echo "y" | sdkmanager "emulator" "platform-tools" "platforms;android-${ANDROID_SDK_VERSION}" "build-tools;${ANDROID_SDK_VERSION}.0.0" "system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64"

# Create an Android Virtual Device
RUN echo "no" | avdmanager create avd -n "avd${ANDROID_SDK_VERSION}" -k "system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64"

# Copy the current directory contents into the container at /app
# COPY . .

# Install any needed packages specified in package.json
# RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=development

# Run the application
CMD ["npm", "start"]
