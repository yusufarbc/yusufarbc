#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse

def check_ffmpeg():
    try:
        # Run ffmpeg -version to check if it is in PATH
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        return False

def convert_audio(input_path, output_path=None, bitrate="96k", mono=True):
    if not os.path.exists(input_path):
        print(f"Error: Input audio file '{input_path}' does not exist.")
        return False

    if not check_ffmpeg():
        print("=" * 60)
        print("Error: FFmpeg is not installed or not found in your system's PATH.")
        print("This script requires FFmpeg to convert and compress audio files.")
        print("\nTo install FFmpeg on Windows:")
        print("  1. Open terminal/PowerShell as administrator and run:")
        print("     winget install ffmpeg")
        print("  2. Or download it from: https://ffmpeg.org/download.html")
        print("  3. Restart your terminal to apply the PATH changes.")
        print("=" * 60)
        return False

    # Determine default output path if not specified
    if not output_path:
        dir_name = os.path.dirname(input_path)
        base_name = os.path.basename(input_path)
        name, _ = os.path.splitext(base_name)
        output_path = os.path.join(dir_name, f"{name}.mp3")

    print(f"Converting: {input_path}")
    print(f"Target: {output_path}")
    print(f"Bitrate: {bitrate}")
    print(f"Channels: {'Mono' if mono else 'Keep original'}")

    # Build the ffmpeg command
    cmd = ["ffmpeg", "-y", "-i", input_path, "-codec:a", "libmp3lame", "-b:a", bitrate]
    if mono:
        cmd.extend(["-ac", "1"])
    cmd.append(output_path)

    try:
        print("Running FFmpeg...")
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            print(f"Successfully converted and compressed audio file to: {output_path}")
            # Show file size comparison
            orig_size = os.path.getsize(input_path) / (1024 * 1024)
            new_size = os.path.getsize(output_path) / (1024 * 1024)
            print(f"Original size: {orig_size:.2f} MB")
            print(f"Compressed size: {new_size:.2f} MB")
            return True
        else:
            print(f"FFmpeg failed with return code {result.returncode}")
            print(f"Stderr: {result.stderr}")
            return False
    except Exception as e:
        print(f"An error occurred during conversion: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert and compress audio files to MP3 for blog voiceovers.")
    parser.add_argument("input", help="Path to the source audio file (e.g. WAV, M4A, etc.)")
    parser.add_argument("-o", "--output", help="Path to save the output MP3 file (optional)")
    parser.add_argument("-b", "--bitrate", default="96k", help="MP3 bitrate, e.g. 96k, 128k (default: 96k for speech)")
    parser.add_argument("--stereo", action="store_true", help="Keep stereo channels (default is mono for voice optimization)")

    args = parser.parse_args()
    convert_audio(args.input, args.output, args.bitrate, not args.stereo)
