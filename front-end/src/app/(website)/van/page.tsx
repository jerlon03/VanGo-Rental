import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const VanPage = () => {
  return (
    <div className="w-full ">
    {/* Header Section */}
    <h1>changes</h1>
    <div className="relative">
      <Image
        src="/png/van/vanbg.png"
        alt="Car interior with steering wheel and dashboard"
        layout="responsive"
        width={1200}
        height={400}
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">RENT A VAN</h1>
        <p className="text-lg">Choose your van</p>
      </div>
    </div>

    {/* Main Content */}
    <div className=" mx-auto mt-20 p-10">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Book your next journey with our VanGo Rental services
      </h2>
      <h3 className="text-xl font-medium mb-10">Most Popular Used Van Vehicles</h3>

      {/* Van Card 1 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center">
        <Image
          src="/png/van/van1.png"
          alt="Red Nissan NV350 Urvan"
          width={300}
          height={200}
          className="w-70 h-auto rounded-lg"
        />
        <div className="ml-0 md:ml-6 mt-100 md:mt-0 flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Nissan NV350 Urvan</h4>
            <span className="text-xl font-bold text-gray-700">₱ 5,000.00</span>
          </div>
          <p className="text-gray-600 mt-2">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra bibendum cursus mauris duis fringilla at. Ipsum varius etiam nam ultrices volutpat ad venenatis imperdiet. Ex vestibulum congue mollis habitasse vulputate odio nulla.
          </p>
          <div className="mt-7">
            <h5 className="font-medium">Details</h5>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-user-friends mr-1"></i> {/* Font Awesome icon */}
                <span>4 People</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-cogs mr-1"></i> {/* Font Awesome icon */}
                <span>Automatic</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-suitcase-rolling mr-1"></i> {/* Font Awesome icon */}
                <span>2 Bags</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2 text-gray-600">15 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-40 md:ml-6">
          <Link href='/login'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
              RENT NOW!
            </button>
          </Link>

        </div>
      </div>
      {/* Van Card 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center">
        <Image
          src="/png/van/van1.png"
          alt="Red Nissan NV350 Urvan"
          width={300}
          height={200}
          className="w-70 h-auto rounded-lg"
        />
        <div className="ml-0 md:ml-6 mt-100 md:mt-0 flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Nissan NV350 Urvan</h4>
            <span className="text-xl font-bold text-gray-700">₱ 5,000.00</span>
          </div>
          <p className="text-gray-600 mt-2">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra bibendum cursus mauris duis fringilla at. Ipsum varius etiam nam ultrices volutpat ad venenatis imperdiet. Ex vestibulum congue mollis habitasse vulputate odio nulla.
          </p>
          <div className="mt-7">
            <h5 className="font-medium">Details</h5>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-user-friends mr-1"></i> {/* Font Awesome icon */}
                <span>4 People</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-cogs mr-1"></i> {/* Font Awesome icon */}
                <span>Automatic</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-suitcase-rolling mr-1"></i> {/* Font Awesome icon */}
                <span>2 Bags</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2 text-gray-600">11 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-40 md:ml-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            RENT NOW!
          </button>
        </div>
      </div>

      {/* Van Card 3 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center">
        <Image
          src="/png/van/van1.png"
          alt="Red Nissan NV350 Urvan"
          width={300}
          height={200}
          className="w-70 h-auto rounded-lg"
        />
        <div className="ml-0 md:ml-6 mt-100 md:mt-0 flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Nissan NV350 Urvan</h4>
            <span className="text-xl font-bold text-gray-700">₱ 5,000.00</span>
          </div>
          <p className="text-gray-600 mt-2">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra bibendum cursus mauris duis fringilla at. Ipsum varius etiam nam ultrices volutpat ad venenatis imperdiet. Ex vestibulum congue mollis habitasse vulputate odio nulla.
          </p>
          <div className="mt-7">
            <h5 className="font-medium">Details</h5>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-user-friends mr-1"></i> {/* Font Awesome icon */}
                <span>4 People</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-cogs mr-1"></i> {/* Font Awesome icon */}
                <span>Automatic</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-suitcase-rolling mr-1"></i> {/* Font Awesome icon */}
                <span>2 Bags</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2 text-gray-600">20 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-40 md:ml-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            RENT NOW!
          </button>
        </div>
      </div>

      {/* Van Card 4 */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center">
        <Image
          src="/png/van/van1.png"
          alt="Red Nissan NV350 Urvan"
          width={300}
          height={200}
          className="w-70 h-auto rounded-lg"
        />
        <div className="ml-0 md:ml-6 mt-100 md:mt-0 flex-1">
          <div className="flex items-center justify-start space-x-54">
            <h4 className="text-xl font-semibold">Nissan NV350 Urvan</h4>
            <span className="text-xl font-bold text-gray-700">₱ 5,000.00</span>
          </div>

          <p className="text-gray-600 mt-2">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra bibendum cursus mauris duis fringilla at. Ipsum varius etiam nam ultrices volutpat ad venenatis imperdiet. Ex vestibulum congue mollis habitasse vulputate odio nulla.
          </p>
          <div className="mt-7">
            <h5 className="font-medium">Details</h5>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-user-friends mr-1"></i> {/* Font Awesome icon */}
                <span>4 People</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <i className="fas fa-cogs mr-1"></i> {/* Font Awesome icon */}
                <span>Automatic</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-suitcase-rolling mr-1"></i> {/* Font Awesome icon */}
                <span>2 Bags</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2 text-gray-600">20 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-40 md:ml-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            RENT NOW!
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default VanPage
