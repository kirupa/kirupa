//
//  Created by Kirupa Chinnathambi on 3/26/19.
//  Do whatever you want with this code...please!
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {
    
    var wv: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Change this URL to suit your needs!
        let url = URL(string: "https://www.kirupa.com/tricks/detect_webkit.htm")!
        wv.load(URLRequest(url: url))
    }
    
    override func loadView() {
        wv = WKWebView()
        wv.navigationDelegate = self
        view = wv
    }
}

