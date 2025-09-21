// auth/controllers/google.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth/google')
export class GoogleController {
  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Redirects to Google
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    // Issue JWT or redirect to frontend
    const user = req.user;
    res.redirect(`http://localhost:3000?token=your-jwt-token`);
  }
}
