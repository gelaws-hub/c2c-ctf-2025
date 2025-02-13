from PIL import Image
import piexif

img = Image.open("OSINT-PictureGame.png")
exif_data = piexif.load(img.info["exif"])

print(exif_data)
