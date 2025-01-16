// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Trash,
  Coins,
  Medal,
  Settings,
  Home,
  User,
  ChevronDown,
  Bell,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import {
  createUser,
  getUnreadNotifications,
  markNotificationAsRead,
  getUserByEmail,
  getUserBalance,
} from "@/utils/db/actions";

const navigationItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/report", icon: Settings, label: "Report" },
  { href: "/collect", icon: Trash, label: "Collect" },
  { href: "/rewards", icon: Coins, label: "Rewards" },
  { href: "/leaderboard", icon: Medal, label: "Leaderboard" },
  { href: "/location", icon: MapPin, label: "Location" },
];

const moreItems = [
  { href: "/waste", icon: Trash, label: "Waste" },
  { href: "/market", icon: Coins, label: "Market" },
];

export default function Navbar() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const initUser = async () => {
      if (isSignedIn && user?.emailAddresses?.[0]?.emailAddress) {
        const email = user.emailAddresses[0].emailAddress;
        localStorage.setItem("userEmail", email);
        await createUser(email, user.fullName || "Anonymous User");
      }
    };

    initUser();
  }, [isSignedIn, user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isSignedIn && user?.emailAddresses?.[0]?.emailAddress) {
        const userDb = await getUserByEmail(
          user.emailAddresses[0].emailAddress,
        );
        if (userDb) {
          const unreadNotifications = await getUnreadNotifications(userDb.id);
          setNotifications(unreadNotifications);
        }
      }
    };

    fetchNotifications();
    const notificationInterval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(notificationInterval);
  }, [isSignedIn, user]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (isSignedIn && user?.emailAddresses?.[0]?.emailAddress) {
        const userDb = await getUserByEmail(
          user.emailAddresses[0].emailAddress,
        );
        if (userDb) {
          const userBalance = await getUserBalance(userDb.id);
          setBalance(userBalance);
        }
      }
    };

    fetchUserBalance();

    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail);
    };

    window.addEventListener(
      "balanceUpdated",
      handleBalanceUpdate as EventListener,
    );
    return () => {
      window.removeEventListener(
        "balanceUpdated",
        handleBalanceUpdate as EventListener,
      );
    };
  }, [isSignedIn, user]);

  const handleNotificationClick = async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const AuthButton = () => (
    <SignInButton>
      <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
        Sign In
      </Button>
    </SignInButton>
  );

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-center">
        {/* Logo Section - Moved to the far left */}
        <div className="flex-shrink-0 flex items-center pr-4 relative right-24"> {/* Adjusted this section */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="SmartCycle Logo"
              className="h-16 w-auto" // Adjust size as needed
            />
            <span className="ml-2 text-4xl font-bold text-green-600 hidden sm:block">
              SmartCycle
            </span>
          </Link>
        </div>
  
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`flex items-center space-x-2 text-lg ${
                  pathname === item.href
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                size="lg"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
  
          {/* More Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg">
                More
                <ChevronDown className="ml-1 h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {moreItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="flex items-center text-lg">
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
  
        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {isSignedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.5rem] h-5">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(notification.id)
                        }
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-lg">
                            {notification.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {notification.message}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
  
              {/* Balance */}
              <div className="flex items-center text-lg">
                <Coins className="h-6 w-6 text-green-500" />
                <span className="ml-1 font-semibold">
                  {balance.toFixed(2)}
                </span>
              </div>
  
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-lg">
                    <User className="h-6 w-6 mr-1" />
                    <span className="hidden sm:block mr-1">
                      {user?.fullName || "User"}
                    </span>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/settings">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <AuthButton />
          )}
        </div>
  
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden space-x-4">
          {!isSignedIn && <AuthButton />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
  
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.concat(moreItems).map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.href
                      ? "bg-green-100 text-green-800"
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
  
            {/* Mobile user section */}
            {isSignedIn && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center text-lg">
                    <Coins className="h-6 w-6 text-green-500" />
                    <span className="ml-1 font-semibold">
                      {balance.toFixed(2)}
                    </span>
                  </div>
                  <SignOutButton>
                    <Button variant="ghost">Sign Out</Button>
                  </SignOutButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
  
  
  
  
}
