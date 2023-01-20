import { BadRequestException, Controller, Get, Post } from '@nestjs/common';
import { Body, Req, Res } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';


@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}

    @Get()
    dummy(){
        return "Lalalalalalallalla"
    }

    @Post('register')
    async register(
        @Body ('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ){

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);

        const newUser = await this.userService.register({
            name,
            email,
            password: hashedPassword
        })

        delete newUser.password
        return newUser
    }

    @Post('login')
    async login(
        @Body ('email') email: string,
        @Body ('password') password: string,
        @Res({passthrough:true}) response:Response //passthrough true sends cookie to the frontend
    ){
        const emailExist = await this.userService.findOneByEmail(email)

        if(!emailExist){
            throw new BadRequestException('Credentials are not valid')
        }

        const userPassword = await bcrypt.compare(password, emailExist.password)

        if(!userPassword){
            throw new BadRequestException('Credentials are not valid')
        }

        //expires in todo
        const jwt = await this.jwtService.signAsync(emailExist.id, {secret: process.env.JWT_SECRET})

        
        

       delete emailExist.password

        response.cookie('jwt', jwt, {httpOnly:true})
        return {
            user: emailExist,
            token: jwt
        }


    }

    @Get('signedInUser')
    async signedInUser(@Req() request:Request){
        try{
            const cookie = request.cookies['jwt']


        //returning the user

        const userId = await this.jwtService.verifyAsync(cookie, {secret:process.env.JWT_SECRET})

        if(!userId){
            throw new UnauthorizedException();
        }

        const user = await this.userService.findOneById(userId)

        const {password, ...data} = user;
        return data;
        }
        catch(error){
            throw new UnauthorizedException();
        }

    }

    @Post('logout')
    async logout(@Res({passthrough:true}) response:Response){

        response.clearCookie('jwt')

        return {
            message: 'SUCCESS'
        }

    }
}
