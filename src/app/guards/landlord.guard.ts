import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LandlordGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    const isLandlordOrAdmin = currentUser && (currentUser.role === 'landlord' || currentUser.role === 'admin');
    
    if (!isLandlordOrAdmin) {
      return this.router.createUrlTree(['/products'], { queryParams: { returnUrl: state.url } });
    }
    
    return true;
  }
}