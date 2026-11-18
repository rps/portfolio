// Renders page 1 of a PDF to a PNG at the given scale.
// Usage: swift scripts/render-resume.swift <in.pdf> <out.png> [scale=3]
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 3,
      let doc = CGPDFDocument(URL(fileURLWithPath: args[1]) as CFURL),
      let page = doc.page(at: 1) else {
  FileHandle.standardError.write("usage: render-resume.swift <in.pdf> <out.png> [scale]\n".data(using: .utf8)!)
  exit(1)
}
let scale = args.count > 3 ? CGFloat(Double(args[3]) ?? 3) : 3
let box = page.getBoxRect(.mediaBox)
let w = Int(box.width * scale), h = Int(box.height * scale)
let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
                    space: CGColorSpace(name: CGColorSpace.sRGB)!,
                    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))
ctx.scaleBy(x: scale, y: scale)
ctx.drawPDFPage(page)
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, ctx.makeImage()!, nil)
guard CGImageDestinationFinalize(dest) else { exit(1) }
print("\(w)x\(h)")
