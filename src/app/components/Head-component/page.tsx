import Image from "next/image";
import Link from "next/link";

export default function Head(){
            return(
                <div className="min-w-[95vw] min-h-auto bg-slate-50 flex  flex-col  gap-10 top-0">
      <div className=" flex justify-between w-[90vw] h-10 mx-auto mt-5">
        <div className="w-1/2 flex">
        <div>
          <Image
          src={"/Logo Icon.png"}
          alt="Logo"
          width={30}
          height={30}
          />
        </div>
        <div>
          <h1 className="font-bold text-lg">Comforty</h1>
        </div>
        </div>

        <div className="flex justify-between ">
        <div>
        <Link href="/Cart-page" >
          <Image
          src={"https://thumbs.dreamstime.com/z/shopping-cart-icon-symbol-flat-shape-trolley-web-store-button-online-shop-logo-sign-vector-illustration-image-black-silhouette-196187637.jpg"}
          alt="Cart"
          width={20}
          height={20}
          />
          </Link>
        </div>
          <div>
          Cart</div>
          <div>

          </div>

        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between w-[90vw] h-auto  mx-auto my-0">

      <div>
          <ul className="flex space-x-4">
            <li>
          <Link href="/" >Home</Link>
              </li>
            <li>
            <Link href="/products" >Product</Link>
            </li>
            <li>
            <Link href="/FAQ" >FAQ</Link>
            </li>
            <li>
              <Link href="/about" >About</Link>
            </li>
          </ul>
      </div>

      <div>
        Contact: (808) 555-0111
      </div>


      </div>




    </div>
            );
}


// home
// single-product 
// products 
// faq contact 
// cart-page about