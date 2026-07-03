path = r"D:\SynologyDrive\SynologyDrive\wzq\Project\JA Ripple Earth\ripple-earth-next\src\app\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()
print("Lines:", c.count("\n"))
print('"use client" count:', c.count('"use client"'))
print("First 30 chars:", repr(c[:30]))
print("Last 30 chars:", repr(c[-30:]))
idx = c.find("GSAP")
if idx >= 0:
    print("Has GSAP timeline at:", idx)
else:
    print("No GSAP timeline found")
idx2 = c.find("ScrollProgress")
if idx2 >= 0:
    print("Has ScrollProgress at:", idx2)
else:
    print("No ScrollProgress found")
